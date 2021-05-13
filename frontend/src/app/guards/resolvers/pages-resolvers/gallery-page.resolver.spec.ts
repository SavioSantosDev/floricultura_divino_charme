import { TestBed } from '@angular/core/testing';

import { GalleryPageResolver } from './gallery-page.resolver';

describe('GalleryPageResolver', () => {
  let resolver: GalleryPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GalleryPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
