import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AboutPage } from 'src/models/Pages';

@Injectable({
  providedIn: 'root'
})
export class PageAboutService {

  private readonly PATH = `${environment.API}page-about.json`;

  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<AboutPage> {
    return this.http.get<AboutPage>(this.PATH);
  }
}
