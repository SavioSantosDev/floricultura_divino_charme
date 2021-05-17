import { Component, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

import { AlertToastComponent } from './alert-toast.component';

interface IToast {
  headerContent: string;
  bodyContent: string;
  statusColor: string;
  animation?: boolean;
  autohide?: boolean;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertToastService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  createAndShowToast(
    viewContainerRef: ViewContainerRef,
    {
      statusColor,
      headerContent,
      bodyContent,
      animation,
      autohide,
      delay,
    }: IToast
  ) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertToastComponent);
    const componentRef = viewContainerRef.createComponent<AlertToastComponent>(componentFactory);

    componentRef.instance.statusColor = statusColor;
    componentRef.instance.headerContent = headerContent
    componentRef.instance.bodyContent = bodyContent
    if (animation) componentRef.instance.animation = animation;
    if (autohide) componentRef.instance.autohide = autohide;
    if (delay) componentRef.instance.delay = delay;

    // Destroy all components after delay (500ms to fade animation)
    setTimeout(() => {
      viewContainerRef.clear();
    }, componentRef.instance.delay + 500)
  }
}
