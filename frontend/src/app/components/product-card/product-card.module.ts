import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ProductCardComponent } from './product-card.component';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [ProductCardComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ProductCardComponent,
  ],
  providers: [
     {
       provide: LOCALE_ID,
       useValue: 'pt-BR',
     },
   ]
})
export class ProductCardModule { }
