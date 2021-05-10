import request from 'supertest';

import app from '../../src/app';

// Requests

export function reqStore(
  route: string,
  categoryUniqueName: string,
): request.Test {
  return request(app).post(`${route}/${categoryUniqueName}`);
}

export function reqIndex(
  route: string,
  categoryUniqueName: string,
): request.Test {
  return request(app).get(`${route}/${categoryUniqueName}`);
}

export function reqShow(
  route: string,
  categoryUniqueName: string,
  uniqueName: string,
): request.Test {
  return request(app).get(`${route}/${categoryUniqueName}/${uniqueName}`);
}

export function reqDelete(
  route: string,
  categoryUniqueName: string,
  uniqueName: string,
): request.Test {
  return request(app).delete(`${route}/${categoryUniqueName}/${uniqueName}`);
}

export function reqUpdate(
  route: string,
  categoryUniqueName: string,
  uniqueName: string,
): request.Test {
  return request(app).put(`${route}/${categoryUniqueName}/${uniqueName}`);
}

// Store and Update methods

export async function storeSut(
  route: string,
  categoryUniqueName: string,
  name?: string,
): Promise<request.Response> {
  const req = reqStore(route, categoryUniqueName);

  if (name) {
    return await req.field('name', name);
  }

  return await req;
}

export async function updateSut(
  route: string,
  categoryUniqueName: string,
  uniqueName: string,
  name?: string,
): Promise<request.Response> {
  const req = reqUpdate(route, categoryUniqueName, uniqueName);

  if (name) {
    return await req.field('name', name);
  }

  return await req;
}
