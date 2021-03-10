import { Component, OnInit, Input } from '@angular/core';

import { HomePageProducts } from 'src/models/Pages';

@Component({
  selector: 'app-products-links',
  templateUrl: './products-links.component.html',
  styleUrls: ['./products-links.component.scss']
})
export class ProductsLinksComponent implements OnInit {

  @Input() sProducts?: HomePageProducts;

  constructor() { }

  ngOnInit(): void {
  }

}
