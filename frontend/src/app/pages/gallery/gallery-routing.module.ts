import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryComponent } from './gallery.component';
import { GalleryResolver } from 'src/app/guards/resolvers/gallery.resolver';
import { PageGalleryResolver } from 'src/app/guards/resolvers/page-gallery.resolver';

const routes: Routes = [
  // /galeria
  {
    path: '', component: GalleryComponent,
    resolve: {
      images: GalleryResolver,
      pageGallery: PageGalleryResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
