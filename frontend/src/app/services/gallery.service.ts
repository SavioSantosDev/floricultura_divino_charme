import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Image } from 'src/models/Image';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private readonly PATH = `${environment.API}gallery.json`;

  private hasMoreImages = false; //

  constructor(private http: HttpClient) { }

  /**
   * Listar as imagens da galeria. Cada requisição irá listar uma quantidade limitada de imagens
   */
  list(list = 1): Observable<Image[]>  {

    if (list < 1) {
      list = 1;
    }

    const limit = 6;  // Limite de imagens por requisição
    const skip = (list - 1) * limit;  // Quantas imagens 'pular'

    return this.http.get<Image[]>(this.PATH)
      .pipe(
        map((images: Image[]) => images.slice(skip, skip + limit)),
        tap(images => {
          this.hasMoreImages = images.length > 0;
        }),
        catchError(error => {
          console.error(error);
          return EMPTY;
        })
      );
  }

  getHasMoreImages(): boolean {
    return this.hasMoreImages;
  }
}
