import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreInformation } from 'src/models/storeInformation/StoreInformation';
import { PageContact } from 'src/models/PageContact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  storeInformation: StoreInformation;
  pageContact: PageContact;

  constructor(
    private route: ActivatedRoute
  ) {
    this.storeInformation = this.route.snapshot.data.storeInformation;
    this.pageContact = this.route.snapshot.data.pageContact;
  }

  ngOnInit(): void {
  }

}
