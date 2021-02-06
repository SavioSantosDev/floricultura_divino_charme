import { TestBed } from '@angular/core/testing';

import { PageHomeResolver } from './page-home.resolver';

describe('PageHomeResolver', () => {
  let resolver: PageHomeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PageHomeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
