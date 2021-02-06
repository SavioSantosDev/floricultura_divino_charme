import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageAbout } from 'src/models/PageAbout';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  pageAbout: PageAbout;

  constructor(route: ActivatedRoute) {
    this.pageAbout = route.snapshot.data.pageAbout;
  }

  ngOnInit(): void {
  }

}
