import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ImagesService } from 'src/app/services/images.service';
import { IImage } from 'src/models/Image';


@Injectable({
  providedIn: 'root'
})
export class ImagesResolver implements Resolve<IImage | IImage[]> {

  constructor(private imagesService: ImagesService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IImage | IImage[]> {

    if (route.params && route.params.imageID) {
      return this.imagesService.show(route.params.imageID);
    }
    return this.imagesService.index();
  }
}
