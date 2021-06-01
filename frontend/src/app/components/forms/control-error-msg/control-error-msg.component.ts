import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CustomValidation } from 'src/app/shared/formularios/CustomValidation';

@Component({
  selector: 'app-control-error-msg',
  templateUrl: './control-error-msg.component.html',
  styleUrls: ['./control-error-msg.component.scss']
})
export class ControlErrorMsgComponent {

  @Input() control?: FormControl;
  @Input() controlLabel?: string;

  constructor() { }

  /**
   * Obter uma mensagem específica para um erro de validação ou null caso não haja errors.
   */
  get errorMessage(): null | string {
    if (this.control && this.controlLabel) {
      for (const errorProp in this.control.errors)  {
        if (this.control.touched) {
          return CustomValidation.getErrorMessage(  this.controlLabel, errorProp, this.control.errors[errorProp]  );
        }
      }
    }
    return null;
  }

}
