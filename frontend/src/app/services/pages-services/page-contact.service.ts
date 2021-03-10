import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ContactPage } from 'src/models/Pages';

@Injectable({
  providedIn: 'root'
})
export class PageContactService {

  private readonly PATH = `${environment.API}page-contact.json`;

  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<ContactPage> {
    return this.http.get<ContactPage>(this.PATH);
  }
}
