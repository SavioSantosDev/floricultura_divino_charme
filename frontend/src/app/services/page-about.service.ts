import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PageAbout } from 'src/models/PageAbout';

@Injectable({
  providedIn: 'root'
})
export class PageAboutService {

  private readonly PATH = `${environment.API}page-about.json`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Simplesmente retornar os dados da página sobre
   */
  index(): Observable<PageAbout> {
    return this.http.get<PageAbout>(this.PATH);
  }
}
