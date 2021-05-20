import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IContactPage } from 'src/models/pages/Contact.page';

@Injectable({
  providedIn: 'root'
})
export class ContactPageService {

  private readonly URL = `${environment.API}/contact`;

  constructor(private http: HttpClient) { }

  index(): Observable<IContactPage> {
    return this.http.get<IContactPage>(this.URL);
  }
}
