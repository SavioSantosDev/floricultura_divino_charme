import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlErrorMsgComponent } from './control-error-msg/control-error-msg.component';
import { AlertToastComponent } from './alert-toast/alert-toast.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    ControlErrorMsgComponent,
    AlertToastComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ControlErrorMsgComponent,
    ConfirmModalComponent
  ],
  entryComponents: [ AlertToastComponent ]
})
export class FormsModule { }
