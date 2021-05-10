import {
  dropDatabaseAndCloseConnection,
  createConnectionAndRunMigrations,
} from '../utils';
import {
  storeSut,
  reqIndex,
  reqShow,
  reqDelete,
  updateSut,
} from '../factories/sub-category.factory';
import { storeSut as storeCategory } from '../factories/category.factory';

const baseRoute = '/api/sub-categorias';

let amountSubCategories = 0;
let categoryUniqueName: string;

// Suts and expected suts for tests

const suts = ['Arbóreas', 'Update sub category'];

type ExpectSut = {
  name: string;
  unique_name: string;
};

const expectSuts: ExpectSut[] = [
  {
    name: 'Arbóreas',
    unique_name: 'arboreas',
  },
  {
    name: 'Update sub category',
    unique_name: 'update-sub-category',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expectSutData(resData: any, expectSut: ExpectSut) {
  expect(resData).toHaveProperty('name', expectSut.name);
  expect(resData).toHaveProperty('unique_name', expectSut.unique_name);
  expect(resData).toHaveProperty('category');
}

// Store and update methods using baseRoute

async function storeSubCategory(name?: string) {
  try {
    return await storeSut(baseRoute, categoryUniqueName, name);
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function updateSubCategory(uniqueName: string, name?: string) {
  try {
    return await updateSut(baseRoute, categoryUniqueName, uniqueName, name);
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Check the data right after the update
 */
async function checkUpdateData(uniqueName: string, expectData: ExpectSut) {
  const res = await reqShow(baseRoute, categoryUniqueName, uniqueName);
  expectSutData(res.body, expectData);
}

async function getSubCategoryUniqueNameByIndex(i: number) {
  return (await reqIndex(baseRoute, categoryUniqueName)).body[i].unique_name;
}

async function getSubCategoriesAmount() {
  return (await reqIndex(baseRoute, categoryUniqueName)).body.length;
}

beforeAll(async () => {
  await createConnectionAndRunMigrations();

  categoryUniqueName = (await storeCategory('/api/categorias', 'Plantas')).body
    .unique_name;
});

afterAll(async () => {
  await dropDatabaseAndCloseConnection();
});

/**
 * Store method
 */
describe('Store Sub Categories', () => {
  it('Should not sotre with invalid category name', async () => {
    const res = await storeSut(baseRoute, 'invalid', suts[0]);
    expect(res.status).toBe(400);
  });

  it('Should store with valid param and fields', async () => {
    const res = await storeSubCategory(suts[0]);
    if (res) {
      expect(res.status).toBe(201);
      expectSutData(res.body, expectSuts[0]);
      amountSubCategories++;
    }
  });

  it('Should not store with exist sub category', async () => {
    const res = await storeSubCategory(suts[0]);
    if (res) {
      expect(res.status).toBe(400);
    }
  });

  it('Should not store without name field', async () => {
    const res = await storeSubCategory();
    if (res) {
      expect(res.status).toBe(400);
    }
  });
});

/**
 * Index method
 */
describe('List all sub categories', () => {
  it('Should not list with invalid param', async () => {
    const response = await reqIndex(baseRoute, 'invalid');
    expect(response.status).toBe(400);
  });

  it('Should list all created sub categories', async () => {
    const response = await reqIndex(baseRoute, categoryUniqueName);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(amountSubCategories);
  });
});

/**
 * Show method
 */
describe('Show a single sub category', () => {
  let uniqueName: string;

  it('Should not show with invalid category unique name param', async () => {
    uniqueName = await getSubCategoryUniqueNameByIndex(0);

    const res = await reqShow(baseRoute, 'invalid', uniqueName);
    expect(res.status).toBe(400);
  });

  it('Should not show with invalid unique name param', async () => {
    const res = await reqShow(baseRoute, categoryUniqueName, 'invalid');
    expect(res.status).toBe(400);
  });

  it('Should show with valid params', async () => {
    const res = await reqShow(baseRoute, categoryUniqueName, uniqueName);
    expect(res.status).toBe(200);
    expectSutData(res.body, expectSuts[0]);
  });
});

/**
 * Update method
 */
describe('Update a single Sub Category', () => {
  let uniqueName: string;

  it('Should not update with invalid category unique name param', async () => {
    uniqueName = await getSubCategoryUniqueNameByIndex(0);

    const res = await updateSut(baseRoute, 'invalid', uniqueName, suts[1]);
    if (res) {
      expect(res.status).toBe(400);
    }

    await checkUpdateData(uniqueName, expectSuts[0]);
  });

  it('Should not update with invalid unique name param', async () => {
    const res = await updateSubCategory('invalid', suts[1]);
    if (res) {
      expect(res.status).toBe(400);
    }

    uniqueName = await getSubCategoryUniqueNameByIndex(0);
    await checkUpdateData(uniqueName, expectSuts[0]);
  });

  it('Should update with valid fields and parameters', async () => {
    const res = await updateSubCategory(uniqueName, suts[1]);
    if (res) {
      expect(res.status).toBe(200);
    }

    uniqueName = await getSubCategoryUniqueNameByIndex(0);
    await checkUpdateData(uniqueName, expectSuts[1]);
  });

  it('Should not update with exist sub category', async () => {
    const res = await updateSubCategory(uniqueName, suts[1]);
    if (res) {
      expect(res.status).toBe(400);
    }

    uniqueName = await getSubCategoryUniqueNameByIndex(0);
    await checkUpdateData(uniqueName, expectSuts[1]);
  });

  it('Should not update without name field', async () => {
    const res = await updateSubCategory(uniqueName);
    if (res) {
      expect(res.status).toBe(400);
    }

    uniqueName = await getSubCategoryUniqueNameByIndex(0);
    await checkUpdateData(uniqueName, expectSuts[1]);
  });
});

/**
 * Delete method
 */
describe('Delete a single product sub category', () => {
  let uniqueName: string;

  it('Should not delete with invalid category unique name param', async () => {
    uniqueName = await getSubCategoryUniqueNameByIndex(0);

    const beforeAmount = await getSubCategoriesAmount();
    const res = await reqDelete(baseRoute, 'invalid', uniqueName);
    const afterAmount = await getSubCategoriesAmount();

    expect(res.status).toBe(400);
    expect(beforeAmount).toEqual(afterAmount);
  });

  it('Should not delete with invalid unique name param', async () => {
    const beforeAmount = await getSubCategoriesAmount();
    const res = await reqDelete(baseRoute, categoryUniqueName, 'invalid');
    const afterAmount = await getSubCategoriesAmount();

    expect(res.status).toBe(400);
    expect(beforeAmount).toEqual(afterAmount);
  });

  it('should delete with valid parameters', async () => {
    const beforeAmount = await getSubCategoriesAmount();
    const res = await reqDelete(baseRoute, categoryUniqueName, uniqueName);
    const afterAmount = await getSubCategoriesAmount();

    expect(res.status).toBe(200);
    expect(afterAmount).toEqual(beforeAmount - 1);
    amountSubCategories--;
    expectSutData(res.body, expectSuts[1]); // has been update in the last describe
  });
});
