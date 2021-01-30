import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductSingleComponent } from './product-single/product-single.component';
import { ProductsListComponent } from './products-list/products-list.component';


@NgModule({
  declarations: [ProductSingleComponent, ProductsListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
