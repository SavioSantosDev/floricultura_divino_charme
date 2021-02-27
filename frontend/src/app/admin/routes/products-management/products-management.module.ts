import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsManagementRoutingModule } from './products-management-routing.module';
import { ProductsManagementComponent } from './products-management.component';


@NgModule({
  declarations: [ProductsManagementComponent],
  imports: [
    CommonModule,
    ProductsManagementRoutingModule
  ]
})
export class ProductsManagementModule { }
