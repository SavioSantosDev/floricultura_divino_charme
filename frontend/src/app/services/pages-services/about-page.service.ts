import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IAboutPage } from 'src/models/pages/About.page';

@Injectable({
  providedIn: 'root'
})
export class AboutPageService {

  private readonly URL = `${environment.API}/about`;

  constructor(
    private http: HttpClient,
  ) { }

  index(): Observable<IAboutPage> {
    return this.http.get<IAboutPage>(this.URL);
  }
}
