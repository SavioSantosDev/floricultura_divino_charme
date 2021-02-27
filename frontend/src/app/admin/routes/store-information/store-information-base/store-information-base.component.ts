import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-store-information-base',
  templateUrl: './store-information-base.component.html',
  styleUrls: ['./store-information-base.component.scss']
})
export class StoreInformationBaseComponent {

  @Input() title = '';
  @Input() infoText = '';
  @Input() isDisabledAddButton = false;

  @Output() addControl = new EventEmitter();


  constructor(
  ) { }


  /**
   * Add new field to form
   */
  onAdd(): void {
    this.addControl.emit();
  }


}
