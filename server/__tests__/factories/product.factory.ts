import request from 'supertest';

import app from '../../src/app';

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

export interface IProductFields {
  name: string;
  value: string;
  description: string;
  active: string;
  // images: string[];
}

export class MockProduct implements IProductFields {
  name: string;
  value: string;
  description: string;
  active: string;
  // images: string[];

  constructor({ name, value, description, active }: IProductFields) {
    this.name = name;
    this.value = value;
    this.description = description;
    this.active = active;
  }
}

export function makeSut({
  name,
  value,
  description,
  active,
}: IProductFields): MockProduct {
  return new MockProduct({ name, value, description, active });
}

export async function storeSut(
  route: string,
  { name, value, description, active }: Partial<IProductFields>,
): Promise<request.Response> {
  const req = reqStore(route);

  if (name) req.field('name', name);
  if (value) req.field('value', value);
  if (description) req.field('description', description);
  if (active) req.field('active', active);
  // if (images) {
  //   for (const image of images) {
  //     req.attach('images', image);
  //   }
  // }

  return await req;
}

export async function updateSut(
  route: string,
  uniqueName: string,
  { name, value, description, active }: Partial<IProductFields>,
): Promise<request.Response> {
  const req = reqUpdate(route, uniqueName);

  if (name) req.field('name', name);
  if (value) req.field('value', value);
  if (description) req.field('description', description);
  if (active) req.field('active', active);
  // if (images) {
  //   for (const image of images) {
  //     req.attach('images', image);
  //   }
  // }

  return await req;
}
