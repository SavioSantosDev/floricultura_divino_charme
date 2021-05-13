import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryComponent } from './gallery.component';
import { GalleryPageResolver } from 'src/app/guards/resolvers/pages-resolvers/gallery-page.resolver';

const routes: Routes = [
  // /galeria
  {
    path: '', component: GalleryComponent,
    resolve: {
      galleryPage: GalleryPageResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
