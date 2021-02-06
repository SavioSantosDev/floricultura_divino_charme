import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from 'src/models/Contact';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly PATH = `${environment.API}contact.json`;

  constructor(private http: HttpClient) { }

  /**
   * Retonar os dados de contato
   */
  index(): Observable<Contact> {
    return this.http.get<Contact>(this.PATH);
  }
}
