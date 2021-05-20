import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IGalleryPage } from 'src/models/pages/Gallery.page';

@Injectable({
  providedIn: 'root'
})
export class GalleryPageService {

  private readonly URL = `${environment.API}/gallery`;

  constructor(private http: HttpClient) { }

  index(): Observable<IGalleryPage> {
    return this.http.get<IGalleryPage>(this.URL);
  }
}
