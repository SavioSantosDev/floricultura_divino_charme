import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-content',
  template: `
    <span>{{ content }}</span><span *ngIf="icon" class="material-icons ms-3">{{ icon }}</span>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
    }
  `]
})
export class ButtonContentComponent {
  @Input() icon?: string;
  @Input() content = 'Button';
}
