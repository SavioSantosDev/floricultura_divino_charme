import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ProductPreviewRoutingModule } from './product-preview-routing.module';
import { ProductPreviewComponent } from './product-preview.component';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { ButtonsModule } from 'src/app/components/buttons/buttons.module';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [ProductPreviewComponent],
  imports: [
    CommonModule,
    ProductPreviewRoutingModule,
    BreadcrumbModule,
    ButtonsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
  ]
})
export class ProductPreviewModule { }
