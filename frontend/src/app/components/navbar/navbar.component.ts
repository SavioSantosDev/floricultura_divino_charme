import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as Bootstrap from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  navbarCollapse = true;
  @ViewChild('collapse') private menuCollapseElement?: ElementRef;
  private menuCollapse?: Bootstrap.Collapse;

  constructor() {
  }

  ngAfterViewInit() {
    this.menuCollapse = new Bootstrap.Collapse(this.menuCollapseElement?.nativeElement, {
      toggle: false,
    });
  }

  toggleMenu() {
    this.menuCollapse?.toggle();
  }

  hiddenMenu() {
    this.menuCollapse?.hide();
  }

}
