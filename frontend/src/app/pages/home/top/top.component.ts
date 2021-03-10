import { Component, Input, OnInit } from '@angular/core';

import { HomePageBanner } from 'src/models/Pages';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  @Input() sBanner?: HomePageBanner;

  constructor() { }

  ngOnInit(): void {
  }

}
