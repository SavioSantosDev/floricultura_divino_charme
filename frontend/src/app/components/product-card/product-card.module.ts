import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ButtonsModule } from '../buttons/buttons.module';
import { AdminProductCardComponent } from './admin-product-card/admin-product-card.component';
import { PublicProductCardComponent } from './public-product-card/public-product-card.component';
import { PurchaseModalModule } from '../purchase-modal/purchase-modal.module';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AdminProductCardComponent, PublicProductCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    ButtonsModule,
    PurchaseModalModule
  ],
  exports: [
    AdminProductCardComponent,
    PublicProductCardComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ]
})
export class ProductCardModule { }
