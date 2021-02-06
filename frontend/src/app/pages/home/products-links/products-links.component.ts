import { Component, OnInit, Input } from '@angular/core';

import { PageHomeSProducts } from 'src/models/PageHomeSProducts';

@Component({
  selector: 'app-products-links',
  templateUrl: './products-links.component.html',
  styleUrls: ['./products-links.component.scss']
})
export class ProductsLinksComponent implements OnInit {

  @Input() sProducts?: PageHomeSProducts;

  constructor() { }

  ngOnInit(): void {
  }

}
