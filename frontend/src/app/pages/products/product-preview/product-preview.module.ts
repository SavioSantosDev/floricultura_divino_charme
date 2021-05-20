import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPreviewRoutingModule } from './product-preview-routing.module';
import { ProductPreviewComponent } from './product-preview.component';


@NgModule({
  declarations: [ProductPreviewComponent],
  imports: [
    CommonModule,
    ProductPreviewRoutingModule
  ]
})
export class ProductPreviewModule { }
