import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from 'src/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Product | Product[]> {

  constructor(private productService: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product | Product[]> {

    // Se for passado parametros ou seja um identificador(nome do produto) é para mostrar apenas o produto especificado
    if (route.params && route.params.id) {
      return this.productService.show(route.params.id);
    }

    // Se nenhum parametro for passado é para fazer a listagem de todos os produtos
    return this.productService.list();
  }
}
