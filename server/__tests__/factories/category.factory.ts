import request from 'supertest';

import app from '../../src/app';

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
  name?: string,
): Promise<request.Response> {
  const req = reqStore(route);

  if (name) {
    return await req.field('name', name);
  }

  return await req;
}

export async function updateSut(
  route: string,
  uniqueName: string,
  name?: string,
): Promise<request.Response> {
  const req = reqUpdate(route, uniqueName);

  if (name) {
    req.field('name', name);
  }
  return await req;
}
