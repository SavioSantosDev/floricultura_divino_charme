import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { PageContactService } from 'src/app/services/pages-services/page-contact.service';
import { ContactPage } from 'src/models/Pages';

@Injectable({
  providedIn: 'root'
})
export class PageContactResolver implements Resolve<ContactPage> {

  constructor(private pageContactService: PageContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ContactPage> {
    return this.pageContactService.index();
  }
}
