import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-textarea',
  templateUrl: './control-textarea.component.html',
  styleUrls: ['./control-textarea.component.scss']
})
export class ControlTextareaComponent {

  @Input() formGroup?: FormGroup;
  @Input() name: string | null = null;
  @Input() placeholder?: string;
  @Input() label?: string;
  @Input() formText?: string;
  @Input() rows?: string;
  @Input() cols?: string;
  @Input() autofocus = false;
  @Input() readonly = false;
  @Input() required = true;

  get formControl() { return this.formGroup?.get(this.name || '') as FormControl; }
}
