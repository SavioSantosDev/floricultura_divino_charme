import { Component, OnInit, Input } from '@angular/core';

import { PageHomeSFeaturedProducts } from 'src/models/PageHomeSFeaturedProducts';

@Component({
  selector: 'app-products-preview',
  templateUrl: './products-preview.component.html',
  styleUrls: ['./products-preview.component.scss', '../../../shared/scss/products.scss' ]
})
export class ProductsPreviewComponent implements OnInit {

  @Input() sFeaturedProducts?: PageHomeSFeaturedProducts;

  constructor() { }

  ngOnInit(): void {
  }

}
