import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // admin/
  { path: 'login', component: LoginComponent },
  {
    path: '', component: AdminComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./routes/home/home.module').then(mod => mod.HomeModule),
      },
      {
        path: 'gerenciar-produtos',
        loadChildren: () => import('./routes/products/products.module').then(mod => mod.ProductsModule),
      },
      {
        path: 'informacoes-loja',
        loadChildren: () => import('./routes/infos/infos.module').then(mod => mod.InfosModule),
      },
      {
        path: 'galeria-fotos',
        loadChildren: () => import('./routes/gallery/gallery.module').then(mod => mod.GalleryModule),
      },
      {
        path: 'editar-paginas',
        loadChildren: () => import('./routes/pages-content/pages-content.module').then(mod => mod.PagesContentModule),
      },
      {
        path: '',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
