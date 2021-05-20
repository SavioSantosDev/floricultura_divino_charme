import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductsNavbarComponent } from './products-navbar/products-navbar.component';
import { ScrollTopModule } from 'src/app/shared/scroll-top/scroll-top.module';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsNavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductsRoutingModule,
    ScrollTopModule,
  ]
})
export class ProductsModule { }
