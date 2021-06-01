import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-text',
  templateUrl: './control-text.component.html',
  styleUrls: ['./control-text.component.scss']
})
export class ControlTextComponent {

  @Input() formGroup?: FormGroup;
  @Input() name: string | null = null;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() formText?: string;
  @Input() autofocus = false;
  @Input() readonly = false;
  @Input() required = true;
  @Input() type = 'text';

  get formControl() { return this.formGroup?.get(this.name || '') as FormControl; }
}
