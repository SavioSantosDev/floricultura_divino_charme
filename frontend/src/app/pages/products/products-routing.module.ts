import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { ProductsResolver } from 'src/app/guards/resolvers/products.resolver';

const routes: Routes = [
  // /produtos/id   (O identificador será o nome do produto para procurar na lista de produtos)
  {
    path: ':id', component: ProductSingleComponent,
    resolve: {
      product: ProductsResolver
    }
  },
  // /produtos - Listagem de produtos
  {
    path: '', component: ProductsListComponent,
    resolve: {
      products: ProductsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
