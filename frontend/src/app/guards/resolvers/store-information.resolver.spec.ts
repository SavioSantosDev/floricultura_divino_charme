import { TestBed } from '@angular/core/testing';

import { StoreInformationResolver } from './store-information.resolver';

describe('StoreInformationResolver', () => {
  let resolver: StoreInformationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StoreInformationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
