import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from 'src/models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: IProduct[];

  constructor(
    private route: ActivatedRoute
  ) {
    this.products = route.snapshot.data.products;
  }

}
