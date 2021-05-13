import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreInformation } from 'src/models/StoreInformation';
import { IContactPage } from 'src/models/pages/Contact.page';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  storeInformation: StoreInformation;
  contactPage: IContactPage;

  constructor(
    private route: ActivatedRoute
  ) {
    this.storeInformation = this.route.snapshot.data.storeInformation;
    this.contactPage = this.route.snapshot.data.contactPage;
  }

  ngOnInit(): void {
  }

}
