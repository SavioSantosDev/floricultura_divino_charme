import { TestBed } from '@angular/core/testing';

import { PurchaseModalService } from './purchase-modal.service';

describe('PurchaseModalService', () => {
  let service: PurchaseModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
