import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PageGalleryService } from 'src/app/services/pages-services/page-gallery.service';
import {GalleryPage } from 'src/models/Pages';

@Injectable({
  providedIn: 'root'
})
export class PageGalleryResolver implements Resolve<GalleryPage> {

  constructor(private pageGalleryService: PageGalleryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GalleryPage> {
    return this.pageGalleryService.index();
  }
}
