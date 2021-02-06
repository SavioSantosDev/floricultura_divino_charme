import { Component, Input, OnInit } from '@angular/core';
import { PageHomeSBanner } from 'src/models/PageHomeSBanner';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  @Input() sBanner?: PageHomeSBanner;

  constructor() { }

  ngOnInit(): void {
  }

}
