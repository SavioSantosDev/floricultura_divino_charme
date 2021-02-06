import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PageGalleryService } from 'src/app/services/page-gallery.service';
import { PageGallery } from 'src/models/PageGallery';

@Injectable({
  providedIn: 'root'
})
export class PageGalleryResolver implements Resolve<PageGallery> {

  constructor(private pageGalleryService: PageGalleryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageGallery> {
    return this.pageGalleryService.index();
  }
}
