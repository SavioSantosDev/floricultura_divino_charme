import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ButtonsModule } from 'src/app/components/buttons/buttons.module';
import { ProductCardModule } from 'src/app/components/product-card/product-card.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ButtonsModule,
    ProductCardModule,
  ]
})
export class ProductsModule { }
