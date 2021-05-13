import { Component, OnInit, Input } from '@angular/core';

import { IBenefits } from 'src/models/pages/Home.page';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  @Input() homeBenefits?: IBenefits;

  constructor() { }

  ngOnInit(): void {
  }

}
