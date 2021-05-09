import { resolve } from 'path';

import {
  numberOfFiles,
  removeAllDirectoryFiles,
} from '../../src/utils/manage-files';
import {
  dropTableAndCloseConnection,
  createConnectionAndRunMigrations,
} from '../utils';
import {
  expectSutName,
  expectSutUniqueName,
  expectSutImage,
  expectSutProductSubCategories,
  reqDelete,
  reqIndex,
  reqShow,
  storeSut,
  updateSut,
  makeSut,
} from '../factories/category.factory';

const sutRoute = '/api/categorias';
const uploadDir = resolve(
  __dirname,
  '..',
  '..',
  'test-uploads',
  'images',
  'categories',
);

const imagePath = '__tests__/files/test.jpg';
const updateImagePath = '__tests__/files/testUpdate.jpg';
const largeImagePath = '__tests__/files/largeImage.jpg';
const txtPath = '__tests__/files/test.txt';

let amountProductCategories = 0;

/**
 * Used for Show, Delete and Update methods
 */
async function getUniqueName(index: number) {
  const response = await reqIndex(sutRoute);
  return response.body[index].unique_name;
}

/**
 * Return the number of product categories
 */
async function productCategoriesAmount() {
  return (await reqIndex(sutRoute)).body.length;
}

async function getNumberOfUploadedImages() {
  return await numberOfFiles(uploadDir);
}

function expectAmoutProductCategoriesToEqualUploadedImages() {
  it('should have the same number of created product categories and uploaded images', async () => {
    const numberOfUploadedImages = await getNumberOfUploadedImages();
    expect(numberOfUploadedImages).toEqual(amountProductCategories);
  });
}

beforeAll(async () => {
  await createConnectionAndRunMigrations();
});

afterAll(async () => {
  await removeAllDirectoryFiles(uploadDir);
  await dropTableAndCloseConnection();
});

describe('Store product categories', () => {
  it('should create with valid name and image', async () => {
    const sut = makeSut({ name: 'Caqueiros', image: imagePath });
    const response = await storeSut(sutRoute, sut);
    expect(response.status).toBe(201);
    expectSutName(response, 'Caqueiros');
    expectSutUniqueName(response, 'caqueiros');
    expectSutImage(response);
    amountProductCategories++;
  });

  it('should not create without IMAGE', async () => {
    const sut = makeSut({ name: 'Without image' });
    const response = await storeSut(sutRoute, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with large image size', async () => {
    const sut = makeSut({ name: 'Large image', image: largeImagePath });
    const response = await storeSut(sutRoute, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with invalid File type', async () => {
    const sut = makeSut({ name: 'Invalid file', image: txtPath });
    const response = await storeSut(sutRoute, sut);
    expect(response.status).toBe(400);
  });

  it('should not create without NAME', async () => {
    const sut = makeSut({ image: imagePath });
    const response = await storeSut(sutRoute, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with invalid size for field NAME', async () => {
    const name = 'Hey bro, this is a very big string!!!';
    const sut = makeSut({ name, image: imagePath });
    const response = await storeSut(sutRoute, sut);
    expect(response.status).toBe(400);
  });

  it('should not create without data', async () => {
    const sut = makeSut({});
    const response = await storeSut(sutRoute, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with exist product category unique name', async () => {
    const sut = makeSut({ name: 'Caqueiros', image: imagePath });
    const response = await storeSut(sutRoute, sut);
    expect(response.status).toBe(400);
  });

  expectAmoutProductCategoriesToEqualUploadedImages();
});

describe('Index products categories', () => {
  it('should list all created products categories', async () => {
    const response = await reqIndex(sutRoute);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(amountProductCategories);
  });
});

describe('Show a single product category', () => {
  it('should not show product category with invalid Name', async () => {
    const response = await reqShow(sutRoute, 'invalid');
    expect(response.status).toBe(400);
  });

  it('should show product category with valid Name', async () => {
    const uniqueName = await getUniqueName(0); // First created
    const response = await reqShow(sutRoute, uniqueName);
    expect(response.status).toBe(200);
    expectSutName(response, 'Caqueiros');
    expectSutUniqueName(response, 'caqueiros');
    expectSutImage(response);
    expectSutProductSubCategories(response);
  });
});

describe('Delete a product category', () => {
  it('should not delete with invalid Name', async () => {
    const beforeAmount = await productCategoriesAmount();
    const response = await reqDelete(sutRoute, 'invalid');
    const afterAmount = await productCategoriesAmount();

    expect(response.status).toBe(400);
    expect(beforeAmount).toEqual(afterAmount);
  });

  it('should delete with valid Name and return removed product category data', async () => {
    const unique_name = await getUniqueName(0); // First created
    const beforeAmount = await productCategoriesAmount();
    const response = await reqDelete(sutRoute, unique_name);
    const afterAmount = await productCategoriesAmount();

    expect(response.status).toBe(200);
    expect(afterAmount).toEqual(beforeAmount - 1);
    expectSutName(response, 'Caqueiros');
    expectSutUniqueName(response, 'caqueiros');
    expectSutImage(response);
    expectSutProductSubCategories(response);
    amountProductCategories--;
  });

  expectAmoutProductCategoriesToEqualUploadedImages();
});

async function storeSutForTestUpdate(name: string) {
  const testSut = makeSut({ name, image: imagePath });
  await storeSut(sutRoute, testSut);
}

describe('Update Product Category informations', () => {
  let uniqueName: string;

  it('should not update with invalid unique name', async () => {
    await storeSutForTestUpdate('Test for update');
    amountProductCategories++;

    uniqueName = await getUniqueName(0);

    const sut = makeSut({ name: 'Updated', image: imagePath });
    const response = await updateSut(sutRoute, 'invalid', sut);
    expect(response.status).toBe(400);

    const confirmResponse = await reqShow(sutRoute, uniqueName);
    expectSutName(confirmResponse, 'Test for update');
    expectSutUniqueName(confirmResponse, 'test-for-update');
  });

  it('should update valid name and image', async () => {
    const sut = makeSut({ name: 'Updated', image: updateImagePath });
    const response = await updateSut(sutRoute, uniqueName, sut);
    expect(response.status).toBe(200);
    expectSutName(response, 'Updated');
    expectSutImage(response);
    expectSutUniqueName(response, 'updated');

    uniqueName = await getUniqueName(0);

    const confirmResponse = await reqShow(sutRoute, uniqueName);
    expectSutName(confirmResponse, 'Updated');
    expectSutUniqueName(confirmResponse, 'updated');
  });

  it('should not update without image', async () => {
    const sut = makeSut({ name: 'Without image' });
    const response = await updateSut(sutRoute, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update with invalid File type', async () => {
    const sut = makeSut({ name: 'Invalid image type', image: txtPath });
    const response = await updateSut(sutRoute, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update with large image size', async () => {
    const sut = makeSut({ name: 'Large image', image: largeImagePath });
    const response = await updateSut(sutRoute, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update without NAME', async () => {
    const sut = makeSut({ image: imagePath });
    const response = await updateSut(sutRoute, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update with invalid size for field NAME', async () => {
    const name = 'Hey brooo, this is a very big string!';
    const sut = makeSut({ name, image: updateImagePath });
    const response = await updateSut(sutRoute, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update without data', async () => {
    const sut = makeSut({});
    const response = await updateSut(sutRoute, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  it('should not update with exists name', async () => {
    await storeSutForTestUpdate('Plantas');
    amountProductCategories++;

    const sut = makeSut({ name: 'Plantas', image: imagePath });
    const response = await updateSut(sutRoute, uniqueName, sut);
    expect(response.status).toBe(400);
  });

  expectAmoutProductCategoriesToEqualUploadedImages();
});
