import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Validation } from '../Validation';

@Component({
  selector: 'app-control-error-msg',
  templateUrl: './control-error-msg.component.html',
  styleUrls: ['./control-error-msg.component.scss']
})
export class ControlErrorMsgComponent implements OnInit {

  @Input() control?: FormControl;
  @Input() controlLabel?: string;

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * Obter uma mensagem específica para um erro de validação ou null caso não haja errors.
   */
  get errorMessage(): null | string {
    if (this.control && this.controlLabel) {
      for (const errorProp in this.control.errors)  {
        if (this.control.touched) {
          return Validation.getErrorMessage(  this.controlLabel, errorProp, this.control.errors[errorProp]  );
        }
      }
    }

    return null;
  }

}
