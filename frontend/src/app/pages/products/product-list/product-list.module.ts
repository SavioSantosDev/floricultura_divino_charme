import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { PaginationControlsModule } from 'src/app/components/pagination-controls/pagination-controls.module';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    ProductCardModule,
    BreadcrumbModule,
    PaginationControlsModule,
  ]
})
export class ProductListModule { }
