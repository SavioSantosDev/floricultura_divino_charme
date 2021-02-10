import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { GalleryImagesComponent } from './gallery-images/gallery-images.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ScrollTopComponent,
    CamelCasePipe,
    InfiniteScrollComponent,
    GalleryImagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BreadcrumbComponent,
    ScrollTopComponent,
    CamelCasePipe,
    InfiniteScrollComponent,
    GalleryImagesComponent
  ]
})
export class SharedModule { }
