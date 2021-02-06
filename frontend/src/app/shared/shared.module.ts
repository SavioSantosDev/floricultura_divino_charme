import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { ImageFullscreenComponent } from './image-fullscreen/image-fullscreen.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    ScrollTopComponent,
    ImageFullscreenComponent,
    CamelCasePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    BreadcrumbComponent,
    ScrollTopComponent,
    ImageFullscreenComponent,
    CamelCasePipe
  ]
})
export class SharedModule { }
