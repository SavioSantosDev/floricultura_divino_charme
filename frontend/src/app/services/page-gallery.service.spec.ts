import { TestBed } from '@angular/core/testing';

import { PageGalleryService } from './page-gallery.service';

describe('PageGalleryService', () => {
  let service: PageGalleryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageGalleryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
