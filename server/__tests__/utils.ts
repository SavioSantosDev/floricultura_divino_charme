import { createConnection, getConnection } from 'typeorm';
import { join } from 'path';

// CONNECTION DATA BASE

export async function createConnectionAndRunMigrations(): Promise<void> {
  const connection = await createConnection();
  await connection.runMigrations();
}

export async function dropDatabaseAndCloseConnection(): Promise<void> {
  const connection = getConnection();
  await connection.dropDatabase();
  await connection.close();
}

// Upload files paths

export const dirFiles = {
  product1: join(__dirname, 'files', 'product1.png'),
  product2: join(__dirname, 'files', 'product2.jpg'),
  product3: join(__dirname, 'files', 'product3.png'),
  largeImage: join(__dirname, 'files', 'largeImage.jpg'),
  test: join(__dirname, 'files', 'test.jpg'),
  testUpdate: join(__dirname, 'files', 'testUpdate.jpg'),
  txtFile: join(__dirname, 'files', 'test.txt'),
};

export const dirUploadFiles = {
  product: join(__dirname, '..', 'test-uploads', 'images', 'products'),
  categories: join(__dirname, '..', 'test-uploads', 'images', 'categories'),
  subCategories: join(
    __dirname,
    '..',
    'test-uploads',
    'images',
    'sub-categories',
  ),
};
