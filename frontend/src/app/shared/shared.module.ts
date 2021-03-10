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
import { ControlErrorMsgComponent } from './formularios/control-error-msg/control-error-msg.component';
import { ImageListingComponent } from './image-listing/image-listing.component';
import { AlertToastComponent } from './formularios/alert-toast/alert-toast.component';
import { ConfirmModalComponent } from './formularios/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ScrollTopComponent,
    CamelCasePipe,
    InfiniteScrollComponent,
    GalleryImagesComponent,
    MapComponent,
    ControlErrorMsgComponent,
    ImageListingComponent,
    AlertToastComponent,
    ConfirmModalComponent
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
    MapComponent,
    ControlErrorMsgComponent,
    ImageListingComponent,
    AlertToastComponent,
    ConfirmModalComponent
  ],
  entryComponents: [ AlertToastComponent ]
})
export class SharedModule { }
