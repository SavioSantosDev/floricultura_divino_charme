import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageHome } from 'src/models/PageHome';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageHome: PageHome;   // Conteúdo da página home

  constructor(route: ActivatedRoute) {
    this.pageHome = route.snapshot.data.pageHome;
    console.log(this.pageHome);
    console.log(this.pageHome.sBanner);
  }

  ngOnInit(): void {
  }

}
