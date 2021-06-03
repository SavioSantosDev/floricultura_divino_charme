import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from './../../shared/shared.module';
import { ScrollTopModule } from 'src/app/shared/scroll-top/scroll-top.module';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { FormsModule as MyFormsModule } from 'src/app/components/forms/forms.module';
import { ButtonsModule } from 'src/app/components/buttons/buttons.module';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    ScrollTopModule,
    BreadcrumbModule,
    MyFormsModule,
    ButtonsModule,
  ]
})
export class ContactModule { }
