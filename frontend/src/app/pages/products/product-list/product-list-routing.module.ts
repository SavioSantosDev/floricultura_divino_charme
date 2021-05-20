import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsResolver } from 'src/app/guards/resolvers/products.resolver';
import { ProductListComponent } from './product-list.component';

const routes: Routes = [
  // /produtos
  {
    path: '', component: ProductListComponent,
    resolve: {
      products: ProductsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductListRoutingModule { }
