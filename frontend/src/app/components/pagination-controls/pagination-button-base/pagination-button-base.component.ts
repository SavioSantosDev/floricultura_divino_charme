import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pagination-button-base',
  templateUrl: './pagination-button-base.component.html',
  styleUrls: ['./pagination-button-base.component.scss']
})
export class PaginationButtonBaseComponent {

  @Input() type: 'filled' | 'outline' = 'filled';
  @Input() disabled = false;

}
