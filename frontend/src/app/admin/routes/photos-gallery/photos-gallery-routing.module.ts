import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotosGalleryComponent } from './photos-gallery.component';
import { PhotosResolver } from 'src/app/guards/resolvers/photos.resolver';
import { AddPhotoComponent } from './add-photo/add-photo.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { ListPhotosComponent } from './list-photos/list-photos.component';

const routes: Routes = [
  // /galeria-fotos
  {
    path: '', component: PhotosGalleryComponent,
    children: [
      {
        path: '', component: ListPhotosComponent,
        resolve: {
          photos: PhotosResolver
        }
      },
      {
        path: 'editar/:photoId', component: EditPhotoComponent,
        resolve: {
          photo: PhotosResolver
        }
      },
      {
        path: 'adicionar', component: AddPhotoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotosGalleryRoutingModule { }
