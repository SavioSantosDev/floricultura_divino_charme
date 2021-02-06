import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Contact } from 'src/models/Contact';
import { PageContact } from 'src/models/PageContact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  pageContact: PageContact;

  constructor(
    private route: ActivatedRoute
  ) {
    this.contact = this.route.snapshot.data.contact;
    this.pageContact = this.route.snapshot.data.pageContact;
  }

  ngOnInit(): void {
  }

}
