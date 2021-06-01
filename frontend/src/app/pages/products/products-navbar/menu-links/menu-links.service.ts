import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PurchaseModalService } from 'src/app/components/purchase-modal/purchase-modal.service';

import { ICategory } from 'src/models/Category';
import { MenuLinksComponent } from './menu-links.component';

interface IMenuLinks {
  viewContainerRef: ViewContainerRef;
  category: ICategory;
}

@Injectable({
  providedIn: 'root'
})
export class MenuLinksService {
  private viewContainerRef?: ViewContainerRef;
  private purchaseModalIsOpen = false;
  private unsub$ = new Subject();

  constructor(
    private factory: ComponentFactoryResolver,
    private purchaseModalService: PurchaseModalService,
  ) {
    this.subscribeOnPurchaseModal();
  }

  /**
   * Se inscreve e sempre que o evento de fechar a modal for emitido
   * o menu também será destruído.
   */
  private subscribeOnPurchaseModal() {
    this.purchaseModalService.modalIsOpen
      .pipe(takeUntil(this.unsub$))
      .subscribe((isOpen) => {
        this.purchaseModalIsOpen = isOpen;
        if (!isOpen) this.destroy();
      });
  }

  private create({ viewContainerRef, category }: IMenuLinks) {
    this.viewContainerRef = viewContainerRef;
    const factory = this.factory.resolveComponentFactory(MenuLinksComponent);
    const componentRef = this.viewContainerRef.createComponent<MenuLinksComponent>(factory);
    componentRef.instance.category = category;
  }

  private unsub() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  private destroy() {
    this.viewContainerRef?.clear();
  }

  // Só irá criar e destruir este componente se a purchase modal não estiver aberta

  createAndInitializeComponent({ viewContainerRef, category }: IMenuLinks) {
    if (!this.purchaseModalIsOpen) {
      this.create({ viewContainerRef, category });
    }
  }

  destroyComponent() {
    if (!this.purchaseModalIsOpen) {
      this.destroy();
    }
  }

  /**
   * Chamar este método quando o componente que chamar este serviço for destruído.
   */
  purchaseModalUnsubscribe() {
    this.unsub();
  }
}
