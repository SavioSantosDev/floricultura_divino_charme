import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct } from 'src/models/Product';
import { ProductsService } from 'src/app/services/products.service';


@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<IProduct | IProduct[]> {

  constructor(private productService: ProductsService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct | IProduct[]> {

    if (route.params && route.params.productName) {
      return this.productService.show(route.params.productName);
    }
    return this.productService.list();
  }
}
