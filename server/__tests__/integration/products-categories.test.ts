import request from 'supertest';

import app from '../../src/app';
import {
  dropTableAndCloseConnection,
  createConnectionAndRunMigrations,
} from '../factories';

const route = '/admin/produtos/categorias/adicionar/';
const imagePath = '__tests__/files/test.jpg';
const txtPath = '__tests__/files/test.txt';

beforeAll(async () => {
  await createConnectionAndRunMigrations();
});

afterAll(async () => {
  await dropTableAndCloseConnection();
});

describe('Create products categorie', () => {
  it('should not create with invalid CATEGORIE field', async () => {
    const response1 = await request(app)
      .post(route)
      .field('name', 'This is a very big word')
      .field('subCategories', 'sub-1')
      .field('subCategories', 'sub-2')
      .attach('image', imagePath);
    const response2 = await request(app)
      .post(route)
      .field('subCategories', 'sub-1')
      .field('subCategories', 'sub-2')
      .attach('image', imagePath);
    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should not create with invalid SUB-CATEGORIES field', async () => {
    const response1 = await request(app)
      .post(route)
      .field('name', 'Product categorie')
      .field('subCategories', 'This is a very big word')
      .attach('image', imagePath);
    const response2 = await request(app)
      .post(route)
      .field('name', 'Product categorie')
      .field('subCategories', 'su')
      .attach('image', imagePath);
    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should not create with invalid IMAGE field', async () => {
    const response1 = await request(app)
      .post(route)
      .field('name', 'Product categorie')
      .field('subCategories', 'sub-1')
      .field('subCategories', 'sub-2');
    const response2 = await request(app)
      .post(route)
      .field('name', 'Product categorie')
      .field('subCategories', 'sub-1')
      .field('subCategories', 'sub-2')
      .attach('image', txtPath); // passing txt file
    expect(response1.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it('should create with valid fields', async () => {
    const response1 = await request(app)
      .post(route)
      .field('name', 'Caqueiros')
      .attach('image', imagePath);
    expect(response1.status).toBe(201);
    expect(response1.body).toHaveProperty('id');
    expect(response1.body).toHaveProperty('name', 'Caqueiros');
    expect(response1.body).toHaveProperty('unique_name', 'caqueiros');
    expect(response1.body).toHaveProperty('sub_categories');
    expect(response1.body).toHaveProperty('image');
    expect(response1.body).toHaveProperty('created_at');
    expect(response1.body).toHaveProperty('updated_at');

    const response2 = await request(app)
      .post(route)
      .field('name', 'Adubos')
      .field('subCategories', 'Húmos flor')
      .attach('image', imagePath);
    expect(response2.status).toBe(201);
    expect(response2.body).toHaveProperty('id');
    expect(response2.body).toHaveProperty('name', 'Adubos');
    expect(response2.body).toHaveProperty('unique_name', 'adubos');
    expect(response2.body).toHaveProperty('sub_categories');
    expect(response2.body).toHaveProperty('image');
    expect(response2.body).toHaveProperty('created_at');
    expect(response2.body).toHaveProperty('updated_at');

    const response3 = await request(app)
      .post(route)
      .field('name', 'Plantas')
      .field('subCategories', 'Ornamentais')
      .field('subCategories', 'Arbóreas')
      .field('subCategories', 'Frutíferas')
      .attach('image', imagePath);
    expect(response3.status).toBe(201);
    expect(response3.body).toHaveProperty('id');
    expect(response3.body).toHaveProperty('name', 'Plantas');
    expect(response3.body).toHaveProperty('unique_name', 'plantas');
    expect(response3.body).toHaveProperty('sub_categories');
    expect(response3.body).toHaveProperty('image');
  });

  it('should not create with same "name" or "unique_name" field for Categorie', async () => {
    const response = await request(app)
      .post(route)
      .field('name', 'Plantas')
      .attach('image', imagePath);
    expect(response.status).toBe(400);
  });

  it('should not create with same "name or "unique_name" field for subCategories"', async () => {
    const response = await request(app)
      .post(route)
      .field('name', 'Outra coisa')
      .field('subCategories', 'Ornamentais') // Already exist
      .field('subCategories', 'Ornamentais') // Already exist
      .attach('image', imagePath);
    expect(response.status).toBe(400);
  });
});
