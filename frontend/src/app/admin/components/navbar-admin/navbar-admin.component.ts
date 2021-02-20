import { Component, OnInit , ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss'],
  encapsulation: ViewEncapsulation.None // Para que seja possível alterar o css do drag-scroll
})
export class NavbarAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
