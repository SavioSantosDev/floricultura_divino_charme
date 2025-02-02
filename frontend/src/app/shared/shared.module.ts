import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { CamelCasePipe } from './pipes/camel-case.pipe';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { GalleryImagesComponent } from './gallery-images/gallery-images.component';
import { MapComponent } from './map/map.component';
import { ImageListingComponent } from './image-listing/image-listing.component';

@NgModule({
  declarations: [
    CamelCasePipe,
    InfiniteScrollComponent,
    GalleryImagesComponent,
    MapComponent,
    ImageListingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeafletModule,
  ],
  exports: [
    CamelCasePipe,
    InfiniteScrollComponent,
    GalleryImagesComponent,
    MapComponent,
    ImageListingComponent,
  ],
})
export class SharedModule { }
