import { Component, Input } from '@angular/core';

import { ButtonColors } from '../ButtonColors';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'menu' | 'reset' | 'submit' = 'button';
  @Input() color: ButtonColors = 'primary';
  @Input() content: string = 'Button';
  @Input() size?: 'sm' | 'lg';
  @Input() outline = false;
  @Input() rounded = true;
  @Input() disabled = false;
  @Input() icon?: string; // Must be a material icon
}
