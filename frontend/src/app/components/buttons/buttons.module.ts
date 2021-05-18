import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './button/button.component';
import { LinkButtonComponent } from './link-button/link-button.component';
import { ButtonContentComponent } from './button-content/button-content.component';

@NgModule({
  declarations: [
    ButtonComponent,
    LinkButtonComponent,
    ButtonContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    LinkButtonComponent
  ],
})
export class ButtonsModule { }
