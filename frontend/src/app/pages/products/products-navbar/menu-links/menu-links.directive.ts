import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMenuLinks]'
})
export class MenuLinksDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
