import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PageAboutService } from 'src/app/services/page-about.service';
import { PageAbout } from 'src/models/PageAbout';

@Injectable({
  providedIn: 'root'
})
export class PageAboutResolver implements Resolve<PageAbout> {

  constructor(private pageAboutService: PageAboutService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageAbout> {
    return this.pageAboutService.index();
  }
}
