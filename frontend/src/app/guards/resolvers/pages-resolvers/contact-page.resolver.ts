import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { ContactPageService } from 'src/app/services/pages-services/contact-page.service';
import { IContactPage } from 'src/models/pages/Contact.page';

@Injectable({
  providedIn: 'root'
})
export class ContactPageResolver implements Resolve<IContactPage> {

  constructor(private contactPageService: ContactPageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContactPage> {
    return this.contactPageService.index();
  }
}
