import { TestBed } from '@angular/core/testing';

import { PageAboutService } from './page-about.service';

describe('PageAboutService', () => {
  let service: PageAboutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageAboutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
