import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IImage } from 'src/models/Image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private readonly PATH = `${environment.API}/photos.json`;
  private hasMorePhotos = false;

  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<IImage[]> {
    return this.http.get<IImage[]>(this.PATH);
  }


  show(id: string): Observable<IImage> {
    return this.http.get<IImage[]>(this.PATH).pipe(
      map((images) => images.filter((image) => image.id === id)[0])
    );
  }


  list(list = 1): Observable<IImage[]>  {

    if (list < 1) {
      list = 1;
    }

    const limit = 6;  // Limite de imagens por requisição
    const skip = (list - 1) * limit;  // Quantas imagens 'pular'

    return this.http.get<IImage[]>(this.PATH).pipe(
      map((images: IImage[]) => images.slice(skip, skip + limit)),
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
