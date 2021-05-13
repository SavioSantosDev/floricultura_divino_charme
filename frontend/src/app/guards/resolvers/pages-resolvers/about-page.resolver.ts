import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AboutPageService } from 'src/app/services/pages-services/about-page.service';
import { IAboutPage } from 'src/models/pages/About.page';

@Injectable({
  providedIn: 'root'
})
export class AboutPageResolver implements Resolve<IAboutPage> {

  constructor(private aboutPageService: AboutPageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAboutPage> {
    return this.aboutPageService.index();
  }
}
