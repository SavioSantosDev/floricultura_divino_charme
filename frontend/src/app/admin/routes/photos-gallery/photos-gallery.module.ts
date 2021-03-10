import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PhotosGalleryRoutingModule } from './photos-gallery-routing.module';
import { PhotosGalleryComponent } from './photos-gallery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListPhotosComponent } from './list-photos/list-photos.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { AddPhotoComponent } from './add-photo/add-photo.component';


@NgModule({
  declarations: [
    PhotosGalleryComponent,
    ListPhotosComponent,
    EditPhotoComponent,
    AddPhotoComponent
  ],
  imports: [
    CommonModule,
    PhotosGalleryRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PhotosGalleryModule { }
