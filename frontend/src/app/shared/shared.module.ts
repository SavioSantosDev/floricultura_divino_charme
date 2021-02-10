import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { GalleryImagesComponent } from './gallery-images/gallery-images.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ScrollTopComponent,
    CamelCasePipe,
    InfiniteScrollComponent,
    GalleryImagesComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeafletModule,
  ],
  exports: [
    BreadcrumbComponent,
    ScrollTopComponent,
    CamelCasePipe,
    InfiniteScrollComponent,
    GalleryImagesComponent,
    MapComponent
  ]
})
export class SharedModule { }
