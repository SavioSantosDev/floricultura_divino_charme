import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { HomePage } from 'src/models/Pages';


@Injectable({
  providedIn: 'root'
})
export class PageHomeService {

  private readonly PATH = `${environment.API}page-home.json`;

  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<HomePage> {
    return this.http.get<HomePage>(this.PATH);
  }
}
