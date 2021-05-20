import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsResolver } from 'src/app/guards/resolvers/products.resolver';
import { ProductPreviewComponent } from './product-preview.component';

const routes: Routes = [
  // / produtos/:id
  {
    path: '', component: ProductPreviewComponent,
    resolve: {
      products: ProductsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPreviewRoutingModule { }
