import { TestBed } from '@angular/core/testing';

import { PageGalleryResolver } from './page-gallery.resolver';

describe('PageGalleryResolver', () => {
  let resolver: PageGalleryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PageGalleryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
