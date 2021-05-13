import { TestBed } from '@angular/core/testing';

import { ImagesResolver } from './images.resolver';

describe('ImagesResolver', () => {
  let resolver: ImagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ImagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
