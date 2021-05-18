import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { CatalogNavbarComponent } from './catalog-navbar/catalog-navbar.component';


@NgModule({
  declarations: [CatalogComponent, CatalogNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
