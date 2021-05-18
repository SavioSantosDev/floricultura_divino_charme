import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsResolver } from 'src/app/guards/resolvers/products.resolver';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent,
    resolve: {
      products: ProductsResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
