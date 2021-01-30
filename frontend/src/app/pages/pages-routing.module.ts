import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    // Componente contendo os componentes comuns em todas as páginas
    path: '', component: PagesComponent,
    children: [
      // Rotas filhas (As páginas em si)
      {
        path: 'contato',
        loadChildren: () => import('./contact/contact.module').then(mod => mod.ContactModule)
      },
      {
        path: 'sobre',
        loadChildren: () => import('./about/about.module').then(mod => mod.AboutModule)
      },
      {
        path: 'galeria',
        loadChildren: () => import('./gallery/gallery.module').then(mod => mod.GalleryModule)
      },
      {
        path: 'produtos',
        loadChildren: () => import('./products/products.module').then(mod => mod.ProductsModule)
      },
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
