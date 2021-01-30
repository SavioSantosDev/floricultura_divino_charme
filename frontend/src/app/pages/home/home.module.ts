import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TopComponent } from './top/top.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { GalleryPreviewComponent } from './gallery-preview/gallery-preview.component';
import { ProductsPreviewComponent } from './products-preview/products-preview.component';
import { ProductsLinksComponent } from './products-links/products-links.component';


@NgModule({
  declarations: [HomeComponent, TopComponent, BenefitsComponent, GalleryPreviewComponent, ProductsPreviewComponent, ProductsLinksComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
