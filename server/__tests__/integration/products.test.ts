import {
  createConnectionAndRunMigrations,
  dropDatabaseAndCloseConnection,
} from '../utils';
import {
  makeSut,
  reqShow,
  storeSut,
  IProductFields,
  reqIndex,
  reqDelete,
  updateSut,
} from '../factories/product.factory';

const baseRoute = '/api/produtos';

let productAmount = 0;

// Products that will be created
const suts = [
  makeSut({
    name: 'Antúrio',
    value: '29.9',
    description: 'This is Antúrio description',
    active: 'true',
  }),
  makeSut({
    name: 'Lírio da paz',
    value: '35.9',
    description: 'This is Lírio description',
    active: 'false',
  }),
  makeSut({
    name: 'Update product',
    value: '135.9',
    description: 'This is Update product description',
    active: 'true',
  }),
];

// Expect product data
type ExpectSutData = {
  name: string;
  unique_name: string;
  value: number;
  description: string;
  active: boolean;
  // numberOfImages: number;
};

const expectSuts: ExpectSutData[] = [
  {
    name: 'Antúrio',
    unique_name: 'anturio',
    value: 29.9,
    description: 'This is Antúrio description',
    active: true,
  },
  {
    name: 'Lírio da paz',
    unique_name: 'lirio-da-paz',
    value: 35.9,
    description: 'This is Lírio description',
    active: false,
  },
  {
    name: 'Update product',
    unique_name: 'update-product',
    value: 135.9,
    description: 'This is Update product description',
    active: true,
  },
];

async function storeProduct(data: IProductFields) {
  try {
    return await storeSut(baseRoute, data);
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function updateProduct(uniqueName: string, data: IProductFields) {
  try {
    return await updateSut(baseRoute, uniqueName, data);
  } catch (err) {
    console.error(err);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function expectSutData(resData: any, expectData: ExpectSutData) {
  expect(resData).toHaveProperty('name', expectData.name);
  expect(resData).toHaveProperty('unique_name', expectData.unique_name);
  expect(resData).toHaveProperty('value', expectData.value);
  expect(resData).toHaveProperty('description', expectData.description);
  expect(resData).toHaveProperty('active', expectData.active);
}

async function getProductUniqueNameByIndex(i: number) {
  return (await reqIndex(baseRoute)).body[i].unique_name;
}

/**
 * Check the product data right after the update
 */
async function checkUpdateData(uniqueName: string, expectData: ExpectSutData) {
  const res = await reqShow(baseRoute, uniqueName);
  expectSutData(res.body, expectData);
}

// TESTS

beforeAll(async () => {
  await createConnectionAndRunMigrations();
});

afterAll(async () => {
  await dropDatabaseAndCloseConnection();
});

describe('Store Products', () => {
  it('Should store with valid fields and product active', async () => {
    const res = await storeProduct(suts[0]);
    if (res) {
      expect(res.status).toBe(201);
      productAmount++;
      expectSutData(res.body, expectSuts[0]);
    }
  });

  it('Should store with valid fields and product inactive', async () => {
    const res = await storeProduct(suts[1]);
    if (res) {
      expect(res.status).toBe(201);
      productAmount++;
      expectSutData(res.body, expectSuts[1]);
    }
  });

  it('Should not store with exist product', async () => {
    const res = await storeProduct(suts[0]);
    if (res) {
      expect(res.status).toBe(400);
    }
  });

  it('Should not store with invalid name', async () => {
    const res = await storeProduct(Object.assign(suts[0], { name: null }));
    if (res) {
      expect(res.status).toBe(400);
    }
  });

  it('Should not store with invalid product value', async () => {
    const res = await storeProduct(Object.assign(suts[0], { value: null }));
    if (res) {
      expect(res.status).toBe(400);
    }
  });

  it('Should not store with invalid description', async () => {
    const res = await storeProduct(
      Object.assign(suts[0], { description: null }),
    );
    if (res) {
      expect(res.status).toBe(400);
    }
  });

  it('Should not store without product active field', async () => {
    const res = await storeProduct(Object.assign(suts[0], { active: null }));
    if (res) {
      expect(res.status).toBe(400);
    }
  });
});

/**
 * Index
 */
describe('List all products', () => {
  it('Should be to equal productAmount', async () => {
    const res = await reqIndex(baseRoute);
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(productAmount);
  });
});

/**
 * Show
 */
describe('Show a single product', () => {
  it('Should not show with invalid params', async () => {
    const res = await reqShow(baseRoute, 'invalid');
    expect(res.status).toBe(400);
  });

  it('Should show with valid uniqueName param', async () => {
    const res1 = await reqShow(baseRoute, await getProductUniqueNameByIndex(0));
    expect(res1.status).toBe(200);
    expectSutData(res1.body, expectSuts[0]);

    const res2 = await reqShow(baseRoute, await getProductUniqueNameByIndex(1));
    expect(res2.status).toBe(200);
    expectSutData(res2.body, expectSuts[1]);
  });
});

/**
 * Update
 */
describe('Update product data', () => {
  const FIRST_PRODUCT = 0;
  const UPDATE_PRODUCT = 2;
  let uniqueName: string;

  it('Should not update with invalid uniqueName param', async () => {
    uniqueName = await getProductUniqueNameByIndex(FIRST_PRODUCT);

    const res = await updateProduct('invalid', suts[UPDATE_PRODUCT]);
    if (res) {
      expect(res.status).toBe(400);
      await checkUpdateData(uniqueName, expectSuts[FIRST_PRODUCT]);
    }
  });

  it('Should update with valid uniqueName and fields', async () => {
    const res = await updateProduct(uniqueName, suts[UPDATE_PRODUCT]);
    if (res) {
      expect(res.status).toBe(200);

      // Get again unique name
      uniqueName = await getProductUniqueNameByIndex(FIRST_PRODUCT);
      await checkUpdateData(uniqueName, expectSuts[UPDATE_PRODUCT]);
    }
  });
});

/**
 * Delete
 */
describe('Delete a single product', () => {
  it('Should not delete with invalid param', async () => {
    const res = await reqDelete(baseRoute, 'invalid');
    expect(res.status).toBe(400);
  });

  it('Should delete with valid uniqueName param', async () => {
    const res = await reqDelete(
      baseRoute,
      await getProductUniqueNameByIndex(0),
    );
    expect(res.status).toBe(200);
    productAmount--;
    // The first product has been updated in the last describe
    expectSutData(res.body, expectSuts[2]);

    // quatity of products should be to equal productAmount
    const resIndex = await reqIndex(baseRoute);
    expect(resIndex.body.length).toEqual(productAmount);
  });
});
