import { Component, Input, OnInit } from '@angular/core';

import { IBanner } from 'src/models/pages/Home.page';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  @Input() homeBanner?: IBanner;

  constructor() { }

  ngOnInit(): void {
  }

}
