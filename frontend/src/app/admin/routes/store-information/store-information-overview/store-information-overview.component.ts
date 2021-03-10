import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreInformation } from 'src/models/StoreInformation';

@Component({
  selector: 'app-store-information-overview',
  templateUrl: './store-information-overview.component.html',
  styleUrls: ['./store-information-overview.component.scss']
})
export class StoreInformationOverviewComponent implements OnInit {

  storeInformation: StoreInformation;

  constructor(
    route: ActivatedRoute
  ) {
    this.storeInformation = route.snapshot.data.storeInformation;
  }


  ngOnInit(): void {
  }

}
