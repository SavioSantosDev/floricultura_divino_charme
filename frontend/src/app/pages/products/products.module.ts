import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsNavbarComponent } from './products-navbar/products-navbar.component';
import { ScrollTopModule } from 'src/app/shared/scroll-top/scroll-top.module';
import { MenuLinksComponent } from './products-navbar/menu-links/menu-links.component';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { MenuLinksDirective } from './products-navbar/menu-links/menu-links.directive';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsNavbarComponent,
    MenuLinksComponent,
    MenuLinksDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    ScrollTopModule,
    ProductCardModule,
  ]
})
export class ProductsModule { }
