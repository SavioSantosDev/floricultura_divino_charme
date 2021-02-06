import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PageContactService } from 'src/app/services/page-contact.service';
import { PageContact } from 'src/models/PageContact';

@Injectable({
  providedIn: 'root'
})
export class PageContactResolver implements Resolve<PageContact> {

  constructor(private pageContactService: PageContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PageContact> {
    return this.pageContactService.index();
  }
}
