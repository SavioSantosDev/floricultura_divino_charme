import { Component, OnInit, Input } from '@angular/core';

import { ICategories } from 'src/models/pages/Home.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() homeCategories?: ICategories;

  constructor() { }

  ngOnInit(): void {
  }

}
