import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProduct } from 'src/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly URL = `${environment.API}/products`;

  constructor(
    private http: HttpClient
  ) { }


  list(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.URL);
  }


  show(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.URL}/${id}`);
  }
}
