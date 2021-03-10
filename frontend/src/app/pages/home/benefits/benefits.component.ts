import { Component, OnInit, Input } from '@angular/core';

import { HomePageBenefits } from 'src/models/Pages';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  @Input() sBenefits?: HomePageBenefits;

  constructor() { }

  ngOnInit(): void {
  }

}
