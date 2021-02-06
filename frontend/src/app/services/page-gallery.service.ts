import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { PageGallery } from 'src/models/PageGallery';

@Injectable({
  providedIn: 'root'
})
export class PageGalleryService {

  private readonly PATH = `${environment.API}page-gallery.json`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Simplesmente retornar os dados da página da galeria de fotos
   */
  index(): Observable<PageGallery> {
    return this.http.get<PageGallery>(this.PATH);
  }
}
