import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationControlsComponent } from './pagination-controls.component';
import { PaginationButtonBaseComponent } from './pagination-button-base/pagination-button-base.component';

@NgModule({
  declarations: [
    PaginationControlsComponent,
    PaginationButtonBaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationControlsComponent
  ]
})
export class PaginationControlsModule { }
