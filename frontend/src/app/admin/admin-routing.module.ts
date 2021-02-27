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
        path: 'visao-geral',
        loadChildren: () => import('./routes/overview/overview.module').then(mod => mod.OverviewModule),
      },
      {
        path: 'gerenciar-produtos',
        loadChildren: () => import('./routes/products-management/products-management.module').then(mod => mod.ProductsManagementModule),
      },
      {
        path: 'informacoes-loja',
        loadChildren: () => import('./routes/store-information/store-information.module').then(mod => mod.StoreInformationModule),
      },
      {
        path: 'galeria-fotos',
        loadChildren: () => import('./routes/photos-gallery/photos-gallery.module').then(mod => mod.PhotosGalleryModule),
      },
      {
        path: 'editar-paginas',
        loadChildren: () => import('./routes/edit-pages/edit-pages.module').then(mod => mod.EditPagesModule),
      },
      {
        path: '',
        redirectTo: 'visao-geral'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
