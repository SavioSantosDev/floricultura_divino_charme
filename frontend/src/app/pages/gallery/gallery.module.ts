import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from '../../shared/shared.module';
import { ScrollTopModule } from 'src/app/shared/scroll-top/scroll-top.module';

@NgModule({
  declarations: [
    GalleryComponent,
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule,
    ScrollTopModule,
  ]
})
export class GalleryModule { }
