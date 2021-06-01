import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { IProduct } from 'src/models/Product';
import { PurchaseModalComponent } from './purchase-modal.component';

interface IPurchaseModal {
  viewContainerRef: ViewContainerRef;
  product: IProduct;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseModalService {
  private viewContainerRef?: ViewContainerRef;

  private _modalIsOpen = new BehaviorSubject(false);
  modalIsOpen = this._modalIsOpen.asObservable();

  constructor(
    private factory: ComponentFactoryResolver,
  ) { }

  private changeModalState(isOpen: boolean) {
    this._modalIsOpen.next(isOpen);
  }

  openPurchaseModal({ viewContainerRef, product }: IPurchaseModal) {
    this.changeModalState(true);

    this.viewContainerRef = viewContainerRef;
    const factory = this.factory.resolveComponentFactory(PurchaseModalComponent);
    const componentRef = this.viewContainerRef.createComponent<PurchaseModalComponent>(factory);

    componentRef.instance.product = product;
    componentRef.instance.onCloseModal
      .pipe(take(1))
      .subscribe(() => this.destroyComponent());
  }

  destroyComponent() {
    this.changeModalState(false);
    this.viewContainerRef?.clear();
  }
}
