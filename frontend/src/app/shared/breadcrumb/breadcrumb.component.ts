import { Component, OnInit, Input } from '@angular/core';

import { BreadcrumbLink } from '../../../models/BreadcrumbLink';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() links: BreadcrumbLink[] = [];

  // *** O último objeto deverá ter a propriedade 'url'. Esse será considerado o link ativo

  constructor() { }

  ngOnInit(): void {
  }

}
