import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarAdminComponent } from './navbar-admin.component';

@NgModule({
  declarations: [NavbarAdminComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [NavbarAdminComponent],
})
export class NavbarAdminModule { }
