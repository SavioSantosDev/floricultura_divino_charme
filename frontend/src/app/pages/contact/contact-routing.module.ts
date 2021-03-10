import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';

import { StoreInformationResolver } from 'src/app/guards/resolvers/store-information.resolver';
import { PageContactResolver } from 'src/app/guards/resolvers/pages-resolvers/page-contact.resolver';

const routes: Routes = [
  // /contato
  {
    path: '', component: ContactComponent,
    resolve: {
      storeInformation: StoreInformationResolver,
      pageContact: PageContactResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
