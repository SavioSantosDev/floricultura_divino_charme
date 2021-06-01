import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { ScrollTopModule } from 'src/app/shared/scroll-top/scroll-top.module';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    BreadcrumbModule,
    ScrollTopModule
  ]
})
export class AboutModule { }
