import { resolve } from 'path';

import {
  dropTableAndCloseConnection,
  createConnectionAndRunMigrations,
} from '../utils';
import {
  makeSut,
  storeSut,
  reqIndex,
  reqShow,
  reqDelete,
  updateSut,
  expectSutName,
  expectSutUniqueName,
  expectSutImage,
  expectSutProductCategory,
} from '../factories/sub-category.factory';

import {
  makeSut as makeProductCategory,
  storeSut as storeProductCategory,
} from '../factories/category.factory';
import {
  numberOfFiles,
  removeAllDirectoryFiles,
} from '../../src/utils/manage-files';

const routeIndex = '/api/sub-categorias';
const uploadDir = resolve(
  __dirname,
  '..',
  '..',
  'test-uploads',
  'images',
  'sub-categories',
);

const imagePath = '__tests__/files/test.jpg';
const updateImagePath = '__tests__/files/testUpdate.jpg';
const largeImagePath = '__tests__/files/largeImage.jpg';
const txtPath = '__tests__/files/test.txt';

let amountProductSubCategories = 0;
let route: string;

/**
 * Used for Show, Delete and Update methods
 */
async function getUniqueName(index: number) {
  const response = await reqIndex(route);
  return response.body[index].unique_name;
}

/**
 * Return the number of product categories
 */
async function productSubCategoriesAmount() {
  return (await reqIndex(route)).body.length;
}

async function getNumberOfUploadedImages() {
  return await numberOfFiles(uploadDir);
}

function expectAmoutProductSubCategoriesToEqualUploadedImages() {
  it('should have the same number of created product sub categories and uploaded images', async () => {
    const numberOfUploadedImages = await getNumberOfUploadedImages();
    expect(numberOfUploadedImages).toEqual(amountProductSubCategories);
  });
}

beforeAll(async () => {
  await createConnectionAndRunMigrations();

  // Create a product category
  const productCategory = makeProductCategory({
    name: 'Test',
    image: imagePath,
  });
  const productCategoryUniqueName = (
    await storeProductCategory('/api/categorias', productCategory)
  ).body.unique_name;
  route = `${routeIndex}/${productCategoryUniqueName}`;
});

afterAll(async () => {
  // Remove files from categories and subcategories
  await removeAllDirectoryFiles(uploadDir);
  const categoriesDir = resolve(
    __dirname,
    '..',
    '..',
    'test-uploads',
    'images',
    'categories',
  );
  await removeAllDirectoryFiles(categoriesDir);
  await dropTableAndCloseConnection();
});

describe('Store Product Sub Categories', () => {
  it('should not create with invalid product category name', async () => {
    const sut = makeSut({ name: 'Caqueiros', image: imagePath });
    const response = await storeSut(`${routeIndex}/invalid/`, sut);
    expect(response.status).toBe(400);
  });

  it('should create with valid fields', async () => {
    const sut = makeSut({ name: 'Caqueiros', image: imagePath });
    const response = await storeSut(route, sut);
    expect(response.status).toBe(201);
    expectSutName(response, 'Caqueiros');
    expectSutUniqueName(response, 'caqueiros');
    expectSutImage(response);
    amountProductSubCategories++;
  });

  it('should not create without image', async () => {
    const sut = makeSut({ name: 'Without image' });
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with large image size', async () => {
    const sut = makeSut({ name: 'Large image', image: largeImagePath });
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with invalid File type', async () => {
    const sut = makeSut({ name: 'Caqueiros', image: txtPath });
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create without field NAME', async () => {
    const sut = makeSut({ image: imagePath });
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with invalid size for field NAME', async () => {
    const name = 'Hey bro, - this is a very big name!';
    const sut = makeSut({ name, image: imagePath });
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create without data', async () => {
    const sut = makeSut({});
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with exits product sub category name', async () => {
    const sut = makeSut({ name: 'Caqueiros', image: imagePath });
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  expectAmoutProductSubCategoriesToEqualUploadedImages();
});

describe('Index products sub ategories', () => {
  it('should not list with invalid product category name', async () => {
    const response = await reqIndex(`${routeIndex}/invalid/`);
    expect(response.status).toBe(400);
  });

  it('should list all created products categories', async () => {
    const response = await reqIndex(route);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(amountProductSubCategories);
  });
});

describe('Show a single product sub category', () => {
  it('should not show with invalid product category name', async () => {
    const response = await reqIndex(`${routeIndex}/invalid/`);
    expect(response.status).toBe(400);
  });

  it('should not show product category with invalid Name', async () => {
    const response = await reqShow(route, 'invalid');
    expect(response.status).toBe(400);
  });

  it('should show product category with valid Name', async () => {
    const unique_name = await getUniqueName(0); // First created
    const response = await reqShow(route, unique_name);
    expect(response.status).toBe(200);
    expectSutName(response, 'Caqueiros');
    expectSutUniqueName(response, 'caqueiros');
    expectSutImage(response);
    expectSutProductCategory(response);
  });
});

describe('Delete a product sub category', () => {
  it('should not delete with invalid product category name', async () => {
    const beforeAmount = await productSubCategoriesAmount();
    const response = await reqDelete(`${routeIndex}/invalid`, 'invalid');
    const afterAmount = await productSubCategoriesAmount();
    expect(response.status).toBe(400);
    expect(beforeAmount).toEqual(afterAmount);
  });

  it('should not delete with invalid product sub category name', async () => {
    const beforeAmount = await productSubCategoriesAmount();
    const response = await reqDelete(route, 'invalid');
    const afterAmount = await productSubCategoriesAmount();

    expect(response.status).toBe(400);
    expect(beforeAmount).toEqual(afterAmount);
  });

  it('should delete with valid parameters and return deleted product sub category data', async () => {
    const unique_name = await getUniqueName(0); // First created
    const beforeAmount = await productSubCategoriesAmount();
    const response = await reqDelete(route, unique_name);
    const afterAmount = await productSubCategoriesAmount();

    expect(response.status).toBe(200);
    expect(afterAmount).toEqual(beforeAmount - 1);
    expectSutName(response, 'Caqueiros');
    expectSutUniqueName(response, 'caqueiros');
    expectSutImage(response);
    expectSutProductCategory(response);
    amountProductSubCategories--;
  });

  expectAmoutProductSubCategoriesToEqualUploadedImages;
});

async function storeSutForTestUpdate(name: string) {
  const sut = makeSut({ name, image: imagePath });
  await storeSut(route, sut);
}

describe('Update Product Sub Category informations', () => {
  let uniqueName: string;

  it('should not update with invalid product category name', async () => {
    await storeSutForTestUpdate('Update Test');
    amountProductSubCategories++;

    uniqueName = await getUniqueName(0); // After delete

    const sut = makeSut({ name: 'Updated', image: imagePath });
    const response = await updateSut(`${routeIndex}/invalid`, 'invalid', sut);
    expect(response.status).toBe(400);

    const confirmResponse = await reqShow(route, uniqueName);
    expectSutName(confirmResponse, 'Update Test');
    expectSutUniqueName(confirmResponse, 'update-test');
  });

  it('should not update with invalid product sub category name', async () => {
    const sut = makeSut({ name: 'Updated', image: imagePath });
    const response = await updateSut(route, 'invalid', sut);
    expect(response.status).toBe(400);

    uniqueName = await getUniqueName(0); // After delete

    const confirmResponse = await reqShow(route, uniqueName);
    expectSutName(confirmResponse, 'Update Test');
    expectSutUniqueName(confirmResponse, 'update-test');
  });

  it('should update with valid fields', async () => {
    const sut = makeSut({ name: 'Updated', image: updateImagePath });
    const response = await updateSut(route, uniqueName, sut);
    expect(response.status).toBe(200);
    expectSutName(response, 'Updated');
    expectSutUniqueName(response, 'updated');
  });

  it('should not update without image', async () => {
    const sut = makeSut({ name: 'Without image' });
    const response = await updateSut(route, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update with invalid File type', async () => {
    const sut = makeSut({ name: 'Invalid file', image: txtPath });
    const response = await updateSut(route, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update with large image size', async () => {
    const sut = makeSut({ name: 'Updated', image: largeImagePath });
    const response = await updateSut(route, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update without field NAME', async () => {
    const sut = makeSut({ image: imagePath });
    const response = await updateSut(route, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update with invalid size for field NAME', async () => {
    const name = 'Hey bro - This is a very big name';
    const sut = makeSut({ name, image: updateImagePath });
    const response = await updateSut(route, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update without data', async () => {
    const sut = makeSut({});
    const response = await updateSut(route, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update with exists product sub category name', async () => {
    await storeSutForTestUpdate('Other');
    amountProductSubCategories++;

    const sut = makeSut({ name: 'Other', image: updateImagePath });
    const response = await updateSut(route, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  expectAmoutProductSubCategoriesToEqualUploadedImages();
});
