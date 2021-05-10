import {
  dropDatabaseAndCloseConnection,
  createConnectionAndRunMigrations,
} from '../utils';
import {
  reqDelete,
  reqIndex,
  reqShow,
  storeSut,
  updateSut,
} from '../factories/category.factory';

const baseRoute = '/api/categorias';

let amountCategories = 0;

// Suts and expected suts for tests

const suts = ['Plantas', 'Update category'];

type ExpectSut = {
  name: string;
  unique_name: string;
};

const expectSuts: ExpectSut[] = [
  {
    name: 'Plantas',
    unique_name: 'plantas',
  },
  {
    name: 'Update category',
    unique_name: 'update-category',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expectSutData(resData: any, expectSut: ExpectSut) {
  expect(resData).toHaveProperty('name', expectSut.name);
  expect(resData).toHaveProperty('unique_name', expectSut.unique_name);
  expect(resData).toHaveProperty('sub_categories');
}

// Store and update methods using baseRoute

async function storeCategory(name?: string) {
  try {
    return await storeSut(baseRoute, name);
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function updateCategory(uniqueName: string, name?: string) {
  try {
    return await updateSut(baseRoute, uniqueName, name);
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Check the data right after the update
 */
async function checkUpdateData(uniqueName: string, expectData: ExpectSut) {
  const res = await reqShow(baseRoute, uniqueName);
  expectSutData(res.body, expectData);
}

async function getCategoryUniqueNameByIndex(i: number) {
  return (await reqIndex(baseRoute)).body[i].unique_name;
}

async function getCategoriesAmount() {
  return (await reqIndex(baseRoute)).body.length;
}

// Initializing tests!!

beforeAll(async () => {
  await createConnectionAndRunMigrations();
});

afterAll(async () => {
  await dropDatabaseAndCloseConnection();
});

/**
 * Store method
 */
describe('Store categories', () => {
  it('Should store with valid fields', async () => {
    const res = await storeCategory(suts[0]);
    if (res) {
      expect(res.status).toBe(201);
      amountCategories++;
      expect(res.body).toHaveProperty('name', expectSuts[0].name);
      expect(res.body).toHaveProperty('unique_name', expectSuts[0].unique_name);
    }
  });

  it('Should not store with exist category', async () => {
    const res = await storeCategory(suts[0]);
    if (res) {
      expect(res.status).toBe(400);
    }
  });

  it('Should not store with invalid Name', async () => {
    const res = await storeCategory();
    if (res) {
      expect(res.status).toBe(400);
    }
  });
});

/**
 * Index method
 */
describe('List categories', () => {
  it('Should list all created categories', async () => {
    const res = await reqIndex(baseRoute);
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(amountCategories);
  });
});

/**
 * Show method
 */
describe('Show a single category', () => {
  it('Should not show category with invalid param', async () => {
    const res = await reqShow(baseRoute, 'invalid');
    expect(res.status).toBe(400);
  });

  it('Should show category with valid param', async () => {
    const uniqueName = await getCategoryUniqueNameByIndex(0);
    const res = await reqShow(baseRoute, uniqueName);
    expect(res.status).toBe(200);
    expectSutData(res.body, expectSuts[0]);
  });
});

/**
 * Update method
 */
describe('Update Category', () => {
  let uniqueName: string;

  it('Should not update with invalid param', async () => {
    uniqueName = await getCategoryUniqueNameByIndex(0);

    const res = await updateCategory('invalid', suts[1]);
    if (res) {
      expect(res.status).toBe(400);
    }

    await checkUpdateData(uniqueName, expectSuts[0]);
  });

  it('Should update with valid param and fields', async () => {
    const res = await updateCategory(uniqueName, suts[1]);
    if (res) {
      expect(res.status).toBe(200);
    }

    uniqueName = await getCategoryUniqueNameByIndex(0);
    await checkUpdateData(uniqueName, expectSuts[1]);
  });

  it('Should not update with exist category', async () => {
    const res = await updateCategory(uniqueName, suts[1]);
    if (res) {
      expect(res.status).toBe(400);
    }

    uniqueName = await getCategoryUniqueNameByIndex(0);
    await checkUpdateData(uniqueName, expectSuts[1]);
  });

  it('Should not update without name field', async () => {
    const res = await updateCategory(uniqueName);
    if (res) {
      expect(res.status).toBe(400);
    }

    uniqueName = await getCategoryUniqueNameByIndex(0);
    await checkUpdateData(uniqueName, expectSuts[1]);
  });
});

/**
 * Delete method
 */
describe('Delete a single category', () => {
  it('Should not delete with invalid param', async () => {
    const beforeAmount = await getCategoriesAmount();
    const response = await reqDelete(baseRoute, 'invalid');
    const afterAmount = await getCategoriesAmount();

    expect(response.status).toBe(400);
    expect(beforeAmount).toEqual(afterAmount);
  });

  it('Should delete with valid param', async () => {
    const unique_name = await getCategoryUniqueNameByIndex(0);

    const beforeAmount = await getCategoriesAmount();
    const res = await reqDelete(baseRoute, unique_name);
    const afterAmount = await getCategoriesAmount();

    expect(res.status).toBe(200);
    expect(afterAmount).toEqual(beforeAmount - 1);
    amountCategories--;
    expectSutData(res.body, expectSuts[1]);
  });
});
