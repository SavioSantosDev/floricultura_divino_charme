import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IImage } from 'src/models/Image';

type ResponseImages = { images: IImage[]; };

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private readonly URL = `${environment.API}/gallery?images`;
  private hasMorePhotos = false;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Gambiara provisória. Arrumar essa funcionalidade de paginação no backend
   */
  list(list = 1): Observable<IImage[]>  {

    if (list < 1) {
      list = 1;
    }

    const limit = 6;  // Limite de imagens por requisição
    const skip = (list - 1) * limit;  // Quantas imagens 'pular'

    return this.http.get<ResponseImages>(this.URL).pipe(
      map(({ images }) => images.slice(skip, skip + limit)),
      tap(images => this.hasMorePhotos = images.length > 0),
      catchError(error => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  getHasMorePhotos(): boolean {
    return this.hasMorePhotos;
  }
}
