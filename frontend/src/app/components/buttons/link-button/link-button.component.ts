import { Component, Input } from '@angular/core';
import { ButtonColors } from '../ButtonColors';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss']
})
export class LinkButtonComponent {
  @Input() color: ButtonColors = 'primary';
  @Input() content: string = 'Button';
  @Input() size?: 'sm' | 'lg';
  @Input() outline = false;
  @Input() rounded = true;
  @Input() icon?: string; // Must be a material icon

  @Input() target: '_blank' | '_self' | '_parent' | '_top' = '_self';
  @Input() href: string[] = [];
}
