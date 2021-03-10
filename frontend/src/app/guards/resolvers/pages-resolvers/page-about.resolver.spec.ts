import { TestBed } from '@angular/core/testing';

import { PageAboutResolver } from './page-about.resolver';

describe('PageAboutResolver', () => {
  let resolver: PageAboutResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PageAboutResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
