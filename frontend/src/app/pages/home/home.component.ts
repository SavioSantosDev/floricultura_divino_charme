import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HomePage } from 'src/models/Pages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageHome: HomePage;   // Conteúdo da página home

  constructor(route: ActivatedRoute) {
    this.pageHome = route.snapshot.data.pageHome;
    console.log(this.pageHome)
  }

  ngOnInit(): void {
  }

}
