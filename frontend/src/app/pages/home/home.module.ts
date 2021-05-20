import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TopComponent } from './top/top.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { GalleryPreviewComponent } from './gallery-preview/gallery-preview.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { ScrollTopModule } from 'src/app/shared/scroll-top/scroll-top.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    TopComponent,
    BenefitsComponent,
    GalleryPreviewComponent,
    FeaturedProductsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ProductCardModule,
    ScrollTopModule,
    SharedModule,
  ]
})
export class HomeModule { }
