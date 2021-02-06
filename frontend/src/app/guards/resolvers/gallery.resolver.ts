import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { GalleryService } from 'src/app/services/gallery.service';
import { Image } from 'src/models/Image';

@Injectable({
  providedIn: 'root'
})
export class GalleryResolver implements Resolve<Image[]> {

  constructor(private galleryService: GalleryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Image[]> {
    return this.galleryService.list();
  }
}
