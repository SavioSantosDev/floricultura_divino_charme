import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GalleryPage } from 'src/models/Pages';

@Injectable({
  providedIn: 'root'
})
export class PageGalleryService {

  private readonly PATH = `${environment.API}page-gallery.json`;

  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<GalleryPage> {
    return this.http.get<GalleryPage>(this.PATH);
  }
}
