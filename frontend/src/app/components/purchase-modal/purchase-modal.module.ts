import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PurchaseModalComponent } from './purchase-modal.component';
import { FormsModule as MyFormsModule } from 'src/app/components/forms/forms.module';

@NgModule({
  declarations: [PurchaseModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyFormsModule,
  ],
})
export class PurchaseModalModule { }
