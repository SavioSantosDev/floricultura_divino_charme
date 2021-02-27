import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosGalleryRoutingModule } from './photos-gallery-routing.module';
import { PhotosGalleryComponent } from './photos-gallery.component';


@NgModule({
  declarations: [PhotosGalleryComponent],
  imports: [
    CommonModule,
    PhotosGalleryRoutingModule
  ]
})
export class PhotosGalleryModule { }
