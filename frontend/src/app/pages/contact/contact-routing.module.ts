import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';

import { PageContactResolver } from 'src/app/guards/resolvers/page-contact.resolver';
import { ContactResolver } from 'src/app/guards/resolvers/contact.resolver';

const routes: Routes = [
  // /contato
  {
    path: '', component: ContactComponent,
    resolve: {
      contact: ContactResolver,
      pageContact: PageContactResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
