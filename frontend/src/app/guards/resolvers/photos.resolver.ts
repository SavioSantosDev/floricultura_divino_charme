import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PhotosService } from 'src/app/services/photos.service';
import { Photo } from 'src/models/Photo';


@Injectable({
  providedIn: 'root'
})
export class PhotosResolver implements Resolve<Photo | Photo[]> {

  constructor(private photosService: PhotosService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo | Photo[]> {

    if (route.params && route.params.photoId) {
      return this.photosService.show(route.params.photoId);
    }
    return this.photosService.index();
  }
}
