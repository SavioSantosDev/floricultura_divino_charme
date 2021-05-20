import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IHomePage } from 'src/models/pages/Home.page';


@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  private readonly URL = `${environment.API}/home`;

  constructor(private http: HttpClient) { }

  index(): Observable<IHomePage> {
    return this.http.get<IHomePage>(this.URL);
  }
}
