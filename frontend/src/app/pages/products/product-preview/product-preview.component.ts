import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from 'src/models/Product';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss']
})
export class ProductPreviewComponent implements OnInit {

  product?: IProduct;
  activeImage = 0;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
  }

}
