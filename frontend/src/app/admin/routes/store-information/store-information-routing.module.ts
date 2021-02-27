import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreInformationComponent } from './store-information.component';
import { EmailsComponent } from './emails/emails.component';
import { PhonesComponent } from './phones/phones.component';
import { LocationsComponent } from './locations/locations.component';
import { SocialComponent } from './social/social.component';
import { StoreInformationResolver } from 'src/app/guards/resolvers/store-information.resolver';
import { StoreInformationOverviewComponent } from './store-information-overview/store-information-overview.component';

const routes: Routes = [
  {
    path: '', component: StoreInformationComponent,
    children: [
      {
        path: '', component: StoreInformationOverviewComponent,
        resolve: {
          storeInformation: StoreInformationResolver
        }
      },
      {
        path: 'emails', component: EmailsComponent,
        resolve: {
          storeInformation: StoreInformationResolver
        }
      },
      {
        path: 'telefones', component: PhonesComponent,
        resolve: {
          storeInformation: StoreInformationResolver
        }
      },
      {
        path: 'redes-sociais', component: SocialComponent,
        resolve: {
          storeInformation: StoreInformationResolver
        }
      },
      {
        path: 'enderecos', component: LocationsComponent,
        resolve: {
          storeInformation: StoreInformationResolver
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreInformationRoutingModule { }
