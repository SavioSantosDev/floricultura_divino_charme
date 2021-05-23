import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductPreviewComponent } from './product-preview.component';
import { ProductsResolver } from 'src/app/guards/resolvers/products.resolver';

const routes: Routes = [
  // / produtos/:id
  {
    path: '', component: ProductPreviewComponent,
    resolve: {
      product: ProductsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPreviewRoutingModule { }
