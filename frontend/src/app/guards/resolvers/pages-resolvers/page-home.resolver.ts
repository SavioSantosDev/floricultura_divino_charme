import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PageHomeService } from 'src/app/services/pages-services/page-home.service';
import { HomePage } from 'src/models/Pages';

@Injectable({
  providedIn: 'root'
})
export class PageHomeResolver implements Resolve<HomePage> {

  constructor(private pageHomeService: PageHomeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomePage> {
    return this.pageHomeService.index();
  }
}
