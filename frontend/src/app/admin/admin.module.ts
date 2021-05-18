import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarAdminModule } from '../components/navbar-admin/navbar-admin.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    NavbarAdminModule,
  ]
})
export class AdminModule { }
