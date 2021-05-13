import { TestBed } from '@angular/core/testing';

import { ContactPageResolver } from './contact-page.resolver';

describe('ContactPageResolver', () => {
  let resolver: ContactPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ContactPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
