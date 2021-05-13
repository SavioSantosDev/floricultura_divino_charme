import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from 'src/models/Product';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {

  // O produto requisitado
  product: IProduct;

  constructor(
    route: ActivatedRoute
    ) {
    this.product = route.snapshot.data.product;
  }

  ngOnInit(): void {
  }
}
