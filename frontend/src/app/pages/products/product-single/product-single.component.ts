import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ɵLocaleDataIndex } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Bootstrap from 'bootstrap';
import { Carousel  } from 'bootstrap';

import { Product } from './../../../../models/Product';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {

  // O produto requisitado
  product: Product;

  constructor(
    private route: ActivatedRoute
    ) {
    this.product = this.route.snapshot.data.product;
  }

  ngOnInit(): void {
  }
}
