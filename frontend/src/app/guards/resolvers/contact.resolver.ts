import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Contact } from 'src/models/Contact';
import { ContactService } from 'src/app/services/contact.service';


@Injectable({
  providedIn: 'root'
})
export class ContactResolver implements Resolve<Contact> {

  constructor(private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contact> {
    return this.contactService.index();
  }
}
