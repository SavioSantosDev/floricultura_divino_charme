import { TestBed } from '@angular/core/testing';

import { PageHomeService } from './page-home.service';

describe('PageHomeService', () => {
  let service: PageHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
