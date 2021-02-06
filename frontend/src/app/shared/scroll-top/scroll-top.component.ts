import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent implements OnInit {

  constructor(
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
  }

  scrollTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}
