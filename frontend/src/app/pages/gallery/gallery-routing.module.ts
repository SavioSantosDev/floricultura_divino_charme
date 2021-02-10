import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryComponent } from './gallery.component';
import { PageGalleryResolver } from 'src/app/guards/resolvers/page-gallery.resolver';

const routes: Routes = [
  // /galeria
  {
    path: '', component: GalleryComponent,
    resolve: {
      pageGallery: PageGalleryResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
