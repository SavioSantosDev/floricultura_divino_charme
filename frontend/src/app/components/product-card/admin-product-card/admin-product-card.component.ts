import { Component, Input } from '@angular/core';

import { IProduct } from 'src/models/Product';

@Component({
  selector: 'app-admin-product-card',
  templateUrl: './admin-product-card.component.html',
  styleUrls: ['./admin-product-card.component.scss', '../product-card.scss']
})
export class AdminProductCardComponent {
  @Input() product?: IProduct;
}
