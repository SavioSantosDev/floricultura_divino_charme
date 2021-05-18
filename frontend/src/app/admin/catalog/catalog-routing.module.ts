import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'produtos', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'categorias', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
