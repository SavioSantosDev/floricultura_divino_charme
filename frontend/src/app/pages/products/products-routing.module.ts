import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';

const routes: Routes = [
  // /produtos
  {
    path: '', component: ProductsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./product-list/product-list.module').then(mod => mod.ProductListModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./product-preview/product-preview.module').then(mod => mod.ProductPreviewModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
