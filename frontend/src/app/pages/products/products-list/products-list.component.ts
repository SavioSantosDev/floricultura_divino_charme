import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from 'src/models/Product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss', '../../../shared/scss/products.scss']
})
export class ProductsListComponent implements OnInit {

  products: IProduct[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  // Pegar os produtos que já foram requisitados no resolver no products-routing.module
  ngOnInit(): void {
    this.products = this.route.snapshot.data.products;
  }

}
