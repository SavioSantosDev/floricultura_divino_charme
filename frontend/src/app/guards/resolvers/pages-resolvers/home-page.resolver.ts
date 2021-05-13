import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { HomePageService } from 'src/app/services/pages-services/home-page.service';
import { IHomePage } from 'src/models/pages/Home.page';

@Injectable({
  providedIn: 'root'
})
export class HomePageResolver implements Resolve<IHomePage> {

  constructor(private HomePageService: HomePageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHomePage> {
    return this.HomePageService.index();
  }
}
