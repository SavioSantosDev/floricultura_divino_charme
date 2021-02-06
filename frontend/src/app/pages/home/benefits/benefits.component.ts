import { Component, OnInit, Input } from '@angular/core';

import { PageHomeSBenefits } from 'src/models/PageHomeSBenefits';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {

  @Input() sBenefits?: PageHomeSBenefits;

  constructor() { }

  ngOnInit(): void {
  }

}
