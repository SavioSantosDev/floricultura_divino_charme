import { TestBed } from '@angular/core/testing';

import { StoreInformationService } from './store-information.service';

describe('StoreInformationService', () => {
  let service: StoreInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
