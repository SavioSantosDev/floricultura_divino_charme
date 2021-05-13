import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAboutPage } from 'src/models/pages/About.page';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutPage: IAboutPage;

  constructor(route: ActivatedRoute) {
    this.aboutPage = route.snapshot.data.aboutPage;
  }

  ngOnInit(): void {
  }

}
