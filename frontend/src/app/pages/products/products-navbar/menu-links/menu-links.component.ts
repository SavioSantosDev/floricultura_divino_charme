import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ICategory } from 'src/models/Category';

@Component({
  selector: 'app-menu-links',
  templateUrl: './menu-links.component.html',
  styleUrls: ['./menu-links.component.scss']
})
export class MenuLinksComponent {
  @Input() category?: ICategory;
}
