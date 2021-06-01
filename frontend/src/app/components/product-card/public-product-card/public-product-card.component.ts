import { Component, Input, ViewContainerRef } from '@angular/core';

import { IProduct } from 'src/models/Product';
import { PurchaseModalService } from '../../purchase-modal/purchase-modal.service';

@Component({
  selector: 'app-public-product-card',
  templateUrl: './public-product-card.component.html',
  styleUrls: ['./public-product-card.component.scss', '../product-card.scss']
})
export class PublicProductCardComponent {
  @Input() product!: IProduct;

  constructor(
    private purchaseModalService: PurchaseModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  openPurchaseModal() {
    this.purchaseModalService.openPurchaseModal({
      viewContainerRef: this.viewContainerRef,
      product: this.product,
    })
  }
}
