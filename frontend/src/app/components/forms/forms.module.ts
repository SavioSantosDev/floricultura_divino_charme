import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlErrorMsgComponent } from './control-error-msg/control-error-msg.component';
import { AlertToastComponent } from './alert-toast/alert-toast.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ControlTextComponent } from './controls/control-text/control-text.component';
import { ControlTextareaComponent } from './controls/control-textarea/control-textarea.component';

@NgModule({
  declarations: [
    ControlErrorMsgComponent,
    AlertToastComponent,
    ConfirmModalComponent,
    ControlTextComponent,
    ControlTextareaComponent,
  ],
  imports: [
    CommonModule,
    NgFormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ControlErrorMsgComponent,
    ConfirmModalComponent,
    ControlTextComponent,
    ControlTextareaComponent,
  ],
  entryComponents: [ AlertToastComponent ]
})
export class FormsModule { }
