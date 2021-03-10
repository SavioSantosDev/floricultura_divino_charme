import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from 'src/models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly PATH = `${environment.API}products.json`;

  constructor(
    private http: HttpClient
  ) { }


  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PATH);
  }


  show(name: string): Observable<Product> {
    return this.http.get<Product[]>(this.PATH).pipe(
      map((products: Product[]) => products.filter(  (product: Product) => product.name === name  )[0]),
    );
  }

}
