import request from 'supertest';

import app from '../../src/app';

type ProductSubCategoryFields = {
  name?: string;
  image?: string;
};

export class MockProductSubCategory implements ProductSubCategoryFields {
  constructor(public name?: string, public image?: string) {}
}

export function makeSut({
  name,
  image,
}: ProductSubCategoryFields): MockProductSubCategory {
  return new MockProductSubCategory(name, image);
}

// Requests

export function reqStore(route: string): request.Test {
  return request(app).post(route);
}

export function reqIndex(route: string): request.Test {
  return request(app).get(route);
}

export function reqShow(route: string, uniqueName: string): request.Test {
  return request(app).get(`${route}/${uniqueName}`);
}

export function reqDelete(route: string, uniqueName: string): request.Test {
  return request(app).delete(`${route}/${uniqueName}`);
}

export function reqUpdate(route: string, uniqueName: string): request.Test {
  return request(app).put(`${route}/${uniqueName}`);
}

// Store and Update methods

export async function storeSut(
  route: string,
  { name, image }: ProductSubCategoryFields,
): Promise<request.Response> {
  if (name && image) {
    return await reqStore(route).field('name', name).attach('image', image);
  }
  if (name) {
    return await reqStore(route).field('name', name);
  }
  if (image) {
    return await reqStore(route).attach('image', image);
  }
  return await reqStore(route);
}

export async function updateSut(
  route: string,
  uniqueName: string,
  { name, image }: ProductSubCategoryFields,
): Promise<request.Response> {
  if (name && image) {
    return await reqUpdate(route, uniqueName)
      .field('name', name)
      .attach('image', image);
  }
  if (name) {
    return await reqUpdate(route, uniqueName).field('name', name);
  }
  if (image) {
    return await reqUpdate(route, uniqueName).attach('image', image);
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

export function expectSutImage(res: request.Response): void {
  expect(res.body).toHaveProperty('image');
}

export function expectSutProductCategory(res: request.Response): void {
  expect(res.body).toHaveProperty('product_category');
}
