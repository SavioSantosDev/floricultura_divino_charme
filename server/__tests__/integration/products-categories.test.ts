import request from 'supertest';

import app from '../../src/app';
import {
  dropTableAndCloseConnection,
  createConnectionAndRunMigrations,
} from '../factories';

const routeStore = '/admin/produtos/categorias/adicionar/';
const routeIndex = '/admin/produtos/categorias/';

const imagePath = '__tests__/files/test.jpg';
const txtPath = '__tests__/files/test.txt';

function reqPostFor(route: string) {
  return request(app).post(route);
}

/**
 * Index all product categories
 */
async function index() {
  return await request(app).get(routeIndex);
}

function expectInfosOfProductCategory(
  data: unknown,
  name?: string,
  unique_name?: string,
) {
  if (name && unique_name) {
    expect(data).toHaveProperty('name', name);
    expect(data).toHaveProperty('unique_name', unique_name);
  } else {
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('unique_name');
  }
  expect(data).toHaveProperty('image');
  expect(data).toHaveProperty('sub_categories');
  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('created_at');
  expect(data).toHaveProperty('updated_at');
}

beforeAll(async () => {
  await createConnectionAndRunMigrations();
});

afterAll(async () => {
  await dropTableAndCloseConnection();
});

describe('Create products categorie', () => {
  it('should not create with invalid CATEGORIE field', async () => {
    const response1 = await reqPostFor(routeStore)
      .field('name', 'Hey bro - This is a very big word')
      .field('subCategories', 'sub-1')
      .field('subCategories', 'sub-2')
      .attach('image', imagePath);
    const response2 = await reqPostFor(routeStore)
      .field('subCategories', 'sub-1')
      .field('subCategories', 'sub-2')
      .attach('image', imagePath);
    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should not create with invalid SUB-CATEGORIES field', async () => {
    const response1 = await reqPostFor(routeStore)
      .field('name', 'Product categorie')
      .field('subCategories', 'Hey bro - This is a very big word')
      .attach('image', imagePath);
    const response2 = await reqPostFor(routeStore)
      .field('name', 'Product categorie')
      .field('subCategories', 'su')
      .attach('image', imagePath);
    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should not create with invalid IMAGE field', async () => {
    const response1 = await reqPostFor(routeStore)
      .field('name', 'Product categorie')
      .field('subCategories', 'sub-1')
      .field('subCategories', 'sub-2');
    const response2 = await reqPostFor(routeStore)
      .field('name', 'Product categorie')
      .field('subCategories', 'sub-1')
      .field('subCategories', 'sub-2')
      .attach('image', txtPath); // passing txt file
    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should create with valid fields and return infos of created product category', async () => {
    const response1 = await reqPostFor(routeStore)
      .field('name', 'Caqueiros')
      .attach('image', imagePath);
    expect(response1.status).toBe(201);
    expectInfosOfProductCategory(response1.body, 'Caqueiros', 'caqueiros');

    const response2 = await reqPostFor(routeStore)
      .field('name', 'Adubos')
      .field('subCategories', 'Húmos flor')
      .attach('image', imagePath);
    expect(response2.status).toBe(201);
    expectInfosOfProductCategory(response2.body, 'Adubos', 'adubos');

    const response3 = await reqPostFor(routeStore)
      .field('name', 'Plantas')
      .field('subCategories', 'Ornamentais')
      .field('subCategories', 'Arbóreas')
      .field('subCategories', 'Frutíferas')
      .attach('image', imagePath);
    expect(response3.status).toBe(201);
    expectInfosOfProductCategory(response3.body, 'Plantas', 'plantas');
  });

  it('should not create with same "name" or "unique_name" field for Categorie', async () => {
    const response = await reqPostFor(routeStore)
      .field('name', 'Plantas')
      .attach('image', imagePath);
    expect(response.status).toBe(400);
  });

  it('should not create with same "name or "unique_name" field for subCategories"', async () => {
    const response = await reqPostFor(routeStore)
      .field('name', 'Outra coisa')
      .field('subCategories', 'Ornamentais') // Already exist
      .field('subCategories', 'Ornamentais') // Already exist
      .attach('image', imagePath);
    expect(response.status).toBe(400);
  });
});

describe('Index products categories', () => {
  it('should not list products categories when no there is', async () => {
    const response = await index();
    expect(response.status).toBe(200);
    expect(response.body[20]).toBeUndefined();
  });

  it('should list all products categories', async () => {
    const response = await index();
    expect(response.status).toBe(200);
    expectInfosOfProductCategory(response.body[0]);
  });
});

describe('Show a single product category', () => {
  it('should not show product category with invalid ID', async () => {
    const response = await request(app).get(`${routeIndex}invalidId`);
    expect(response.status).toBe(400);
  });

  it('should show product category with valid ID', async () => {
    const productCategory = await index();
    const id = productCategory.body[0].id;
    const response = await request(app).get(`${routeIndex}${id}`);
    expect(response.status).toBe(200);
    expectInfosOfProductCategory(response.body);
  });
});

describe('Delete a product category', () => {
  it('should not delete with invalid ID', async () => {
    const productCategoriesAmount1 = (await index()).body.length;
    const response = await request(app).delete(`${routeIndex}invalidID`);
    const productCategoriesAmount2 = (await index()).body.length;
    expect(response.status).toBe(400);
    expect(productCategoriesAmount1).toEqual(productCategoriesAmount2);
  });

  it('should delete with valid ID and return all infos of the deleted product category', async () => {
    const createdProductCategory = await reqPostFor(routeStore)
      .field('name', 'Nome do produto')
      .attach('image', imagePath);
    const productCategoryId = createdProductCategory.body.id;

    const productCategoriesAmount1 = (await index()).body.length;
    const response = await request(app).delete(
      `${routeIndex}${productCategoryId}`,
    );
    const productCategoriesAmount2 = (await index()).body.length;

    expect(response.status).toBe(200);
    // Not return ID
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('unique_name');
    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('sub_categories');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
    expect(productCategoriesAmount2).toEqual(productCategoriesAmount1 - 1);
  });
});
