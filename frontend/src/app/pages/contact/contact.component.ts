import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreInformation } from 'src/models/StoreInformation';
import { ContactPage } from 'src/models/Pages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  storeInformation: StoreInformation;
  pageContact: ContactPage;

  constructor(
    private route: ActivatedRoute
  ) {
    this.storeInformation = this.route.snapshot.data.storeInformation;
    this.pageContact = this.route.snapshot.data.pageContact;
  }

  ngOnInit(): void {
  }

}
