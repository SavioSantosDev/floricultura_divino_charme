import { TestBed } from '@angular/core/testing';

import { PageContactResolver } from './page-contact.resolver';

describe('PageContactResolver', () => {
  let resolver: PageContactResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PageContactResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
