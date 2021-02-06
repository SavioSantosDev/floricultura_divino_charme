import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PageHome } from 'src/models/PageHome';


@Injectable({
  providedIn: 'root'
})
export class PageHomeService {

  private readonly PATH = `${environment.API}page-home.json`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Simplesmente retornar os dados da página home
   */
  index(): Observable<PageHome> {
    return this.http.get<PageHome>(this.PATH);
  }
}
