import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  {
    // /admin/catalogo
    path: '', component: CatalogComponent,
    children: [
      {
        path: 'produtos',
        loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('./categories/categories.module').then(mod => mod.CategoriesModule)
      },
      { path: '', redirectTo: 'produtos' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
