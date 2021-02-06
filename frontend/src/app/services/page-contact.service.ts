import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PageContact } from 'src/models/PageContact';

@Injectable({
  providedIn: 'root'
})
export class PageContactService {

  private readonly PATH = `${environment.API}page-contact.json`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Simplesmente retornar os dados da página de contato (Não as informações de contato)
   */
  index(): Observable<PageContact> {
    return this.http.get<PageContact>(this.PATH);
  }
}
