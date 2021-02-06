import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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


  /**
   * Listagem de produtos. Retornar todos os produtos.
   */
  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.PATH);
  }


  /**
   * Retornar um produto específico filtrado pela propriedade 'name'
   */
  show(name: string): Observable<Product> {
    return this.http.get<Product[]>(this.PATH).pipe(
      map(  (products: Product[]) => products.filter(  (product: Product) => product.name === name  )[0]  ),
    );
  }

}
