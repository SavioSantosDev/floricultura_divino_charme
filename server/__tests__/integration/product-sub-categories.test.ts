import {
  dropTableAndCloseConnection,
  createConnectionAndRunMigrations,
} from '../factories';

import {
  makeSut,
  storeSut,
  expectSutName,
  expectSutUniqueName,
  expectSutKeywords,
} from '../utils/product-sub-categories.utils';

import {
  makeSut as makeProductCategory,
  storeSut as storeProductCategory,
} from '../utils/product-categories.utils';

const imagePath = '__tests__/files/test.jpg';
const updateImagePath = '__tests__/files/testUpdate.jpg';
const largeImagePath = '__tests__/files/largeImage.jpg';
const txtPath = '__tests__/files/test.txt';

let amountProductSubCategories = 0;
let route: string;

beforeAll(async () => {
  await createConnectionAndRunMigrations();
  const productCategory = makeProductCategory('Test', undefined, imagePath);
  const productCategoryUniqueName = (
    await storeProductCategory('/admin/produtos/categorias/', productCategory)
  ).body.unique_name;
  route = `/admin/produtos/categorias/sub-categorias/${productCategoryUniqueName}/`;
});

afterAll(async () => {
  await dropTableAndCloseConnection();
});

describe('Store Product Sub Categories', () => {
  it('should create without keywords and valid name & image field', async () => {
    const sut = makeSut('Caqueiros', undefined, imagePath);
    const response = await storeSut(route, sut);
    expect(response.status).toBe(201);
    expectSutName(response, 'Caqueiros');
    expectSutUniqueName(response, 'caqueiros');
    expectSutKeywords(response, []);
    amountProductSubCategories++;
  });

  it('should create with one keyword and valid name & image field', async () => {
    const sut = makeSut('Adubos', 'Húmos Flor', imagePath);
    const response = await storeSut(route, sut);
    expect(response.status).toBe(201);
    expectSutName(response, 'Adubos');
    expectSutUniqueName(response, 'adubos');
    expectSutKeywords(response, ['humos-flor']);
    amountProductSubCategories++;
  });

  it('should create with multiple keywords and valid name & image field', async () => {
    const sut = makeSut(
      'Plantas',
      ['Ornamentais', 'Arbóreas', 'Frutíferas'],
      imagePath,
    );
    const response = await storeSut(route, sut);
    expect(response.status).toBe(201);
    expectSutName(response, 'Plantas');
    expectSutUniqueName(response, 'plantas');
    expectSutKeywords(response, ['ornamentais', 'arboreas', 'frutiferas']);
    amountProductSubCategories++;
  });

  it('should not create without image', async () => {
    const sut = makeSut('Test IMAGE', undefined, undefined);
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with large image size', async () => {
    const sut = makeSut('TestIMAGE', undefined, largeImagePath);
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with invalid File type', async () => {
    const sut = makeSut('TestIMAGE', undefined, txtPath);
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create without field NAME', async () => {
    const sut = makeSut(undefined, undefined, imagePath);
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with invalid size for field NAME', async () => {
    const sut = makeSut(
      'Hey bro - This is a very big name',
      undefined,
      imagePath,
    );
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with invalid size for KEYWORDS', async () => {
    const sut = makeSut(
      'Test KEYWORDS',
      'Hey bro - This is a very big name',
      imagePath,
    );
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });

  it('should not create with same "name" or "unique_name" field for Category', async () => {
    const sut = makeSut('Caqueiros', undefined, imagePath);
    const response = await storeSut(route, sut);
    expect(response.status).toBe(400);
  });
});

// describe('Index products categories', () => {
//   it('should list all created products categories', async () => {
//     const response = await reqIndex(routeIndex);
//     expect(response.status).toBe(200);
//     expect(response.body.length).toEqual(amountProductCategories);
//   });
// });

// describe('Show a single product category', () => {
//   it('should not show product category with invalid Name', async () => {
//     const response = await reqShow(routeIndex, 'invalid');
//     expect(response.status).toBe(400);
//   });

//   it('should show product category with valid Name', async () => {
//     const unique_name = await getUniqueName(0); // First created
//     const response = await reqShow(routeIndex, unique_name);
//     expect(response.status).toBe(200);
//     expectSutName(response, 'Caqueiros');
//     expectSutUniqueName(response, 'caqueiros');
//     expectSutKeywords(response, []);
//   });
// });

// describe('Delete a product category', () => {
//   it('should not delete with invalid Name', async () => {
//     const beforeAmount = await productCategoriesAmount();
//     const response = await reqDelete(routeIndex, 'invalid');
//     const afterAmount = await productCategoriesAmount();

//     expect(response.status).toBe(400);
//     expect(beforeAmount).toEqual(afterAmount);
//   });

//   it('should delete with valid Name and return all infos of the deleted product category', async () => {
//     const unique_name = await getUniqueName(0); // First created
//     const beforeAmount = await productCategoriesAmount();
//     const response = await reqDelete(routeIndex, unique_name);
//     const afterAmount = await productCategoriesAmount();

//     expect(response.status).toBe(200);
//     expect(afterAmount).toEqual(beforeAmount - 1);
//     expectSutName(response, 'Caqueiros');
//     expectSutUniqueName(response, 'caqueiros');
//     expectSutKeywords(response, []);
//     amountProductCategories--;
//   });
// });

// describe('Update Product Category informations', () => {
//   let unique_name: string;

//   it('should not update with invalid id', async () => {
//     await storeTestProductCategory();
//     unique_name = await getUniqueName(amountProductCategories - 1); // last created

//     const sut = makeSut('Updated', undefined, imagePath);
//     const response = await updateSut(routeIndex, 'invalid', sut);
//     expect(response.status).toBe(400);

//     const confirmResponse = await reqShow(routeIndex, unique_name);
//     expectSutName(confirmResponse, 'Update Test');
//     expectSutUniqueName(confirmResponse, 'update-test');
//     expectSutKeywords(confirmResponse, []);
//   });

//   it('should update without keywords and valid name & image field', async () => {
//     const sut = makeSut('Updated', undefined, updateImagePath);
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(201);
//     expectSutName(response, 'Updated');
//     expectSutUniqueName(response, 'updated');
//     expectSutKeywords(response, []);
//   });

//   it('should update with one keyword and valid name & image field', async () => {
//     const sut = makeSut('Second Update', 'keyword 1', imagePath);
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(201);
//     expectSutName(response, 'Second Update');
//     expectSutUniqueName(response, 'second-update');
//     expectSutKeywords(response, ['keyword-1']);
//   });

//   it('should update with multiple keywords and valid name & image field', async () => {
//     const sut = makeSut(
//       'Third Update',
//       ['keyword 1', 'keyword 2', 'keyword 3'],
//       updateImagePath,
//     );
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(201);
//     expectSutName(response, 'Third Update');
//     expectSutUniqueName(response, 'third-update');
//     expectSutKeywords(response, ['keyword-1', 'keyword-2', 'keyword-3']);
//   });

//   it('should not update without image', async () => {
//     const sut = makeSut('Test update', undefined, undefined);
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(400);
//   });

//   it('should not update with invalid File type', async () => {
//     const sut = makeSut('TestIMAGE', undefined, txtPath);
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(400);
//   });

//   it('should not update with large image size', async () => {
//     const sut = makeSut('TestIMAGE', undefined, largeImagePath);
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(400);
//   });

//   it('should not update without field NAME', async () => {
//     const sut = makeSut(undefined, undefined, imagePath);
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(400);
//   });

//   it('should not update with invalid size for field NAME', async () => {
//     const sut = makeSut(
//       'Hey bro - This is a very big name',
//       undefined,
//       imagePath,
//     );
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(400);
//   });

//   it('should not update with invalid size for KEYWORDS', async () => {
//     const sut = makeSut(
//       'Test KEYWORDS',
//       'Hey bro - This is a very big name',
//       imagePath,
//     );
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(400);
//   });

//   it('should not update with exists name', async () => {
//     const sut = makeSut('Plantas', undefined, imagePath);
//     const response = await updateSut(routeIndex, unique_name, sut);
//     expect(response.status).toBe(400);
//   });
// });
