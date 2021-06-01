import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseModalService } from 'src/app/components/purchase-modal/purchase-modal.service';

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
    private route: ActivatedRoute,
    private purchaseModalService: PurchaseModalService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
  }

  openPurchaseModal() {
    if (this.product) {
      this.purchaseModalService.openPurchaseModal({
        viewContainerRef: this.viewContainerRef,
        product: this.product,
      })
    }
  }

}
