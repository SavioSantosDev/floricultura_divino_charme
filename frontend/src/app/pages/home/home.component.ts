import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHomePage } from 'src/models/pages/Home.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homePage: IHomePage;   // Conteúdo da página home

  constructor(route: ActivatedRoute) {
    this.homePage = route.snapshot.data.homePage;
    console.log(this.homePage)
  }

  ngOnInit(): void {
  }

}
