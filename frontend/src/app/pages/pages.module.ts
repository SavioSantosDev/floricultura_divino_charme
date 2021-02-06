import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    PagesComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule
  ],
})
export class PagesModule { }
