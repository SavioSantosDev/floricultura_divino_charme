import { Component, OnInit, Input } from '@angular/core';

import { IFeaturedProducts } from 'src/models/pages/Home.page';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss' ]
})
export class FeaturedProductsComponent implements OnInit {

  @Input() homeFeaturedProducts?: IFeaturedProducts;

  constructor() { }

  ngOnInit(): void {
  }

}
