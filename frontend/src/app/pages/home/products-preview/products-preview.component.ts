import { Component, OnInit, Input } from '@angular/core';

import { HomePageFeaturedProducts } from 'src/models/Pages';

@Component({
  selector: 'app-products-preview',
  templateUrl: './products-preview.component.html',
  styleUrls: ['./products-preview.component.scss', '../../../shared/scss/products.scss' ]
})
export class ProductsPreviewComponent implements OnInit {

  @Input() sFeaturedProducts?: HomePageFeaturedProducts;

  constructor() { }

  ngOnInit(): void {
  }

}
