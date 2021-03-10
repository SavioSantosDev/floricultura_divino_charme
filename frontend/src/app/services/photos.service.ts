import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Photo } from 'src/models/Photo';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private readonly PATH = `${environment.API}photos.json`;
  private hasMorePhotos = false;

  constructor(
    private http: HttpClient
  ) { }


  index(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.PATH);
  }


  show(id: string): Observable<Photo> {
    return this.http.get<Photo[]>(this.PATH).pipe(
      map((photos) => photos.filter((photo) => photo.id === id)[0])
    );
  }


  list(list = 1): Observable<Photo[]>  {

    if (list < 1) {
      list = 1;
    }

    const limit = 6;  // Limite de imagens por requisição
    const skip = (list - 1) * limit;  // Quantas imagens 'pular'

    return this.http.get<Photo[]>(this.PATH).pipe(
      map((images: Photo[]) => images.slice(skip, skip + limit)),
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
