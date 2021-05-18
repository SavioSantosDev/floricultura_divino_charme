import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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


  show(name: string): Observable<IProduct> {
    return this.http.get<IProduct[]>(this.URL).pipe(
      map((products: IProduct[]) => products.filter(  (product: IProduct) => product.name === name  )[0]),
    );
  }
}
