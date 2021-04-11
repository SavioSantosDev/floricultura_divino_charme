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

function reqPutFor(route: string) {
  return request(app).put(route);
}

/**
 * Index all product categories
 */
async function index() {
  return await request(app).get(routeIndex);
}

beforeAll(async () => {
  await createConnectionAndRunMigrations();
});

afterAll(async () => {
  await dropTableAndCloseConnection();
});

describe('Create product categories', () => {
  it('should create with valid fields and return infos of created product category', async () => {
    // Without keywords
    const response1 = await reqPostFor(routeStore)
      .field('name', 'Caqueiros')
      .attach('image', imagePath);
    expect(response1.status).toBe(201);
    expect(response1.body).toHaveProperty('name', 'Caqueiros');
    expect(response1.body).toHaveProperty('unique_name', 'caqueiros');
    expect(response1.body).toHaveProperty('keywords', []);

    // 1 keyword
    const response2 = await reqPostFor(routeStore)
      .field('name', 'Adubos')
      .field('keywords', 'Húmos flor')
      .attach('image', imagePath);
    expect(response2.status).toBe(201);
    expect(response2.body).toHaveProperty('name', 'Adubos');
    expect(response2.body).toHaveProperty('unique_name', 'adubos');
    expect(response2.body).toHaveProperty('keywords');
    expect(response2.body.keywords[0]).toHaveProperty('keyword', 'humos-flor');

    // 3 keywords
    const response3 = await reqPostFor(routeStore)
      .field('name', 'Plantas')
      .field('keywords', 'Ornamentais')
      .field('keywords', 'Arbóreas')
      .field('keywords', 'Frutíferas')
      .attach('image', imagePath);
    expect(response3.status).toBe(201);
    expect(response3.body).toHaveProperty('name', 'Plantas');
    expect(response3.body).toHaveProperty('unique_name', 'plantas');
    expect(response3.body).toHaveProperty('keywords');
    expect(response3.body.keywords[0]).toHaveProperty('keyword', 'ornamentais');
    expect(response3.body.keywords[1]).toHaveProperty('keyword', 'arboreas');
    expect(response3.body.keywords[2]).toHaveProperty('keyword', 'frutiferas');
  });

  it('should not create with invalid IMAGE', async () => {
    // Without image
    const response1 = await reqPostFor(routeStore).field(
      'name',
      'Product category',
    );
    expect(response1.status).toBe(400);

    // Invalid file type
    const response2 = await reqPostFor(routeStore)
      .field('name', 'Product category')
      .attach('image', txtPath);
    expect(response2.status).toBe(400);
  });

  it('should not create without field NAME', async () => {
    const response = await reqPostFor(routeStore).attach('image', imagePath);
    expect(response.status).toBe(400);
  });

  it('should not create with invalid size for field NAME', async () => {
    const response1 = await reqPostFor(routeStore)
      .field('name', 'Hey bro - This is a very big name')
      .attach('image', imagePath);
    expect(response1.status).toBe(400);

    const response2 = await reqPostFor(routeStore)
      .field('name', 'He')
      .attach('image', imagePath);
    expect(response2.status).toBe(400);
  });

  it('should not create with invalid size for KEYWORDS', async () => {
    const response1 = await reqPostFor(routeStore)
      .field('name', 'Product category')
      .field('keywords', 'Hey bro - This is a very big name')
      .attach('image', imagePath);
    expect(response1.status).toBe(400);

    const response2 = await reqPostFor(routeStore)
      .field('name', 'Product category')
      .field('keywords', 'He')
      .attach('image', imagePath);
    expect(response2.status).toBe(400);
  });

  it('should not create with same "name" or "unique_name" field for Category', async () => {
    const response = await reqPostFor(routeStore)
      .field('name', 'Caqueiros')
      .attach('image', imagePath);
    expect(response.status).toBe(400);
  });
});
// 3 products were created <----

describe('Index products categories', () => {
  it('should list all created products categories', async () => {
    const response = await index();
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(3);
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
    // First created product category
    expect(response.body).toHaveProperty('name', 'Caqueiros');
    expect(response.body).toHaveProperty('unique_name', 'caqueiros');
    expect(response.body).toHaveProperty('keywords', []);
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
      .field('name', 'Product Category')
      .attach('image', imagePath);
    const productCategoryId = createdProductCategory.body.id;

    const productCategoriesAmount1 = (await index()).body.length;
    const response = await request(app).delete(
      `${routeIndex}${productCategoryId}`,
    );
    const productCategoriesAmount2 = (await index()).body.length;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Product Category');
    expect(response.body).toHaveProperty('unique_name', 'product-category');
    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('keywords', []);
    expect(productCategoriesAmount2).toEqual(productCategoriesAmount1 - 1);
  });
});

// describe('Update method for product category', () => {
//   it('should not update with missing Product Category ID', async () => {
//     const response = await reqPutFor(`${routeIndex}/atualizar`);
//     expect(response.status).toBe(400);
//   });

//   it('should not update with invalid Product Category ID', async () => {
//     const response = await reqPutFor(`${routeIndex}invalidID/atualizar`);
//     expect(response.status).toBe(400);
//   });

//   it('should not update with invalid Product Category Name field', async () => {

//   });

//   it('should not update with invalid CATEGORY NAME field', async () => {
//     const response1 = await reqPostFor(routeUpdate)
//       .field('name', 'Hey bro - This is a very big phrase')
//       .field('subCategories', 'sub-1')
//       .field('subCategories', 'sub-2')
//       .attach('image', imagePath);
//     const response2 = await reqPostFor(routeUpdate)
//       .field('subCategories', 'sub-1')
//       .field('subCategories', 'sub-2')
//       .attach('image', imagePath);
//     expect(response1.status).toBe(400);
//     expect(response2.status).toBe(400);
//   });

//   it('should not create with invalid SUB-CATEGORIES field', async () => {
//     const response1 = await reqPostFor(routeStore)
//       .field('name', 'Product categorie')
//       .field('subCategories', 'Hey bro - This is a very big word')
//       .attach('image', imagePath);
//     const response2 = await reqPostFor(routeStore)
//       .field('name', 'Product categorie')
//       .field('subCategories', 'su')
//       .attach('image', imagePath);
//     expect(response1.status).toBe(400);
//     expect(response2.status).toBe(400);
//   });

//   it('should not create with invalid IMAGE field', async () => {
//     const response1 = await reqPostFor(routeStore)
//       .field('name', 'Product categorie')
//       .field('subCategories', 'sub-1')
//       .field('subCategories', 'sub-2');
//     const response2 = await reqPostFor(routeStore)
//       .field('name', 'Product categorie')
//       .field('subCategories', 'sub-1')
//       .field('subCategories', 'sub-2')
//       .attach('image', txtPath); // passing txt file
//     expect(response1.status).toBe(400);
//     expect(response2.status).toBe(400);
//   });

//   it('should create with valid fields and return infos of created product category', async () => {
//     const response1 = await reqPostFor(routeStore)
//       .field('name', 'Caqueiros')
//       .attach('image', imagePath);
//     expect(response1.status).toBe(201);
//     expectInfosOfProductCategory(response1.body, 'Caqueiros', 'caqueiros');

//     const response2 = await reqPostFor(routeStore)
//       .field('name', 'Adubos')
//       .field('subCategories', 'Húmos flor')
//       .attach('image', imagePath);
//     expect(response2.status).toBe(201);
//     expectInfosOfProductCategory(response2.body, 'Adubos', 'adubos');

//     const response3 = await reqPostFor(routeStore)
//       .field('name', 'Plantas')
//       .field('subCategories', 'Ornamentais')
//       .field('subCategories', 'Arbóreas')
//       .field('subCategories', 'Frutíferas')
//       .attach('image', imagePath);
//     expect(response3.status).toBe(201);
//     expectInfosOfProductCategory(response3.body, 'Plantas', 'plantas');
//   });

//   it('should not create with same "name" or "unique_name" field for Categorie', async () => {
//     const response = await reqPostFor(routeStore)
//       .field('name', 'Plantas')
//       .attach('image', imagePath);
//     expect(response.status).toBe(400);
//   });

//   it('should not create with same "name or "unique_name" field for subCategories"', async () => {
//     const response = await reqPostFor(routeStore)
//       .field('name', 'Outra coisa')
//       .field('subCategories', 'Ornamentais') // Already exist
//       .field('subCategories', 'Ornamentais') // Already exist
//       .attach('image', imagePath);
//     expect(response.status).toBe(400);
//   });
// });
