import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AboutPage } from 'src/models/Pages';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  pageAbout: AboutPage;

  constructor(route: ActivatedRoute) {
    this.pageAbout = route.snapshot.data.pageAbout;
  }

  ngOnInit(): void {
  }

}
