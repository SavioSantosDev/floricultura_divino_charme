import { TestBed } from '@angular/core/testing';

import { PhotosResolver } from './photos.resolver';

describe('PhotosResolver', () => {
  let resolver: PhotosResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PhotosResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
