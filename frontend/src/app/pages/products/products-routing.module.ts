import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductSingleComponent } from './product-single/product-single.component';

const routes: Routes = [
  // /produtos  Listagem dos produtos
  { path: '', component: ProductsListComponent },

  // /produtos/:id  Exibição de um produto
  { path: ':id', component: ProductSingleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
