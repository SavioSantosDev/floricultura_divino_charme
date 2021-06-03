import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';

import { StoreInformationResolver } from 'src/app/guards/resolvers/store-information.resolver';

const routes: Routes = [
  // /contato
  {
    path: '', component: ContactComponent,
    resolve: {
      storeInformation: StoreInformationResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
