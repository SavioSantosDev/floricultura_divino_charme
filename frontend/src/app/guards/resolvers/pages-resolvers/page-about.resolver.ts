import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PageAboutService } from 'src/app/services/pages-services/page-about.service';
import { AboutPage } from 'src/models/Pages';

@Injectable({
  providedIn: 'root'
})
export class PageAboutResolver implements Resolve<AboutPage> {

  constructor(private pageAboutService: PageAboutService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AboutPage> {
    return this.pageAboutService.index();
  }
}
