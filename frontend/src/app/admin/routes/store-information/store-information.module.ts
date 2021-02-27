import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreInformationRoutingModule } from './store-information-routing.module';
import { StoreInformationComponent } from './store-information.component';
import { EmailsComponent } from './emails/emails.component';
import { PhonesComponent } from './phones/phones.component';
import { SocialComponent } from './social/social.component';
import { SharedModule } from '../../../shared/shared.module';
import { LocationsComponent } from './locations/locations.component';
import { StoreInformationBaseComponent } from './store-information-base/store-information-base.component';
import { StoreInformationOverviewComponent } from './store-information-overview/store-information-overview.component';


@NgModule({
  declarations: [
    StoreInformationComponent,
    EmailsComponent,
    PhonesComponent,
    SocialComponent,
    LocationsComponent,
    StoreInformationBaseComponent,
    StoreInformationOverviewComponent,
  ],
  imports: [
    CommonModule,
    StoreInformationRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StoreInformationModule { }
