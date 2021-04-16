import request from 'supertest';

import app from '../../src/app';

type ProductSubCategoryFields = {
  name?: string;
  keywords?: string | string[];
  image?: string;
};

export class MockProductSubCategory implements ProductSubCategoryFields {
  constructor(
    public name?: string,
    public keywords?: string | string[],
    public image?: string,
  ) {}
}

export function makeSut(
  name?: string,
  keywords?: string | string[],
  image?: string,
): MockProductSubCategory {
  return new MockProductSubCategory(name, keywords, image);
}

// Requests

export function reqStore(route: string): request.Test {
  return request(app).post(`${route}adicionar/`);
}

export function reqDelete(route: string, uniqueName: string): request.Test {
  return request(app).delete(`${route}${uniqueName}`);
}

export function reqUpdate(route: string, uniqueName: string): request.Test {
  return request(app).put(`${route}${uniqueName}`);
}

// Store and Update methods

export async function storeSut(
  route: string,
  data: MockProductSubCategory,
): Promise<request.Response> {
  if (data.name && data.keywords && data.image) {
    return await reqStore(route)
      .field('name', data.name)
      .field('keywords', data.keywords)
      .attach('image', data.image);
  }
  if (data.name && data.keywords) {
    return await reqStore(route)
      .field('name', data.name)
      .field('keywords', data.keywords);
  }
  if (data.name && data.image) {
    return await reqStore(route)
      .field('name', data.name)
      .attach('image', data.image);
  }
  if (data.keywords && data.image) {
    return await reqStore(route)
      .field('keywords', data.keywords)
      .attach('image', data.image);
  }
  return await reqStore(route);
}

export async function updateSut(
  route: string,
  uniqueName: string,
  data: MockProductSubCategory,
): Promise<request.Response> {
  if (data.name && data.keywords && data.image) {
    return await reqUpdate(route, uniqueName)
      .field('name', data.name)
      .field('keywords', data.keywords)
      .attach('image', data.image);
  }
  if (data.name && data.keywords) {
    return await reqUpdate(route, uniqueName)
      .field('name', data.name)
      .field('keywords', data.keywords);
  }
  if (data.name && data.image) {
    return await reqUpdate(route, uniqueName)
      .field('name', data.name)
      .attach('image', data.image);
  }
  if (data.keywords && data.image) {
    return await reqUpdate(route, uniqueName)
      .field('keywords', data.keywords)
      .attach('image', data.image);
  }
  return await reqUpdate(route, uniqueName);
}

// Expects data for Product Sub Category

export function expectSutName(res: request.Response, expectName: string): void {
  expect(res.body).toHaveProperty('name', expectName);
}

export function expectSutUniqueName(
  res: request.Response,
  expectUniqueName: string,
): void {
  expect(res.body).toHaveProperty('unique_name', expectUniqueName);
}

export function expectSutKeywords(
  res: request.Response,
  expectKeywords: string[],
): void {
  if (!(expectKeywords.length > 0)) {
    expect(res.body).toHaveProperty('keywords', expectKeywords);
  } else {
    expect(res.body).toHaveProperty('keywords');
    expectKeywords.forEach((value, i: number) => {
      expect(res.body.keywords[i]).toHaveProperty('keyword', value);
    });
  }
}
