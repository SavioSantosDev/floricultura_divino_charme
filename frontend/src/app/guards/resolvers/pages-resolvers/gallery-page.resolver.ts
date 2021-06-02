import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { GalleryPageService } from 'src/app/services/pages-services/gallery-page.service';
import { IGalleryPage } from 'src/models/pages/Gallery.page';

@Injectable({
  providedIn: 'root'
})
export class GalleryPageResolver implements Resolve<IGalleryPage> {

  constructor(private galleryPageService: GalleryPageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGalleryPage> {
    return this.galleryPageService.index();
  }
}
