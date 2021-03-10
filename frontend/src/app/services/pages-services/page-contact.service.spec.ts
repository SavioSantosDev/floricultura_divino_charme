import { TestBed } from '@angular/core/testing';

import { PageContactService } from './page-contact.service';

describe('PageContactService', () => {
  let service: PageContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
