import { Component, Input } from '@angular/core';

import { IProduct } from 'src/models/Product';

@Component({
  selector: 'app-public-product-card',
  templateUrl: './public-product-card.component.html',
  styleUrls: ['./public-product-card.component.scss', '../product-card.scss']
})
export class PublicProductCardComponent  {
  @Input() product?: IProduct;
}
