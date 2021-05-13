import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import { AboutPageResolver } from 'src/app/guards/resolvers/pages-resolvers/about-page.resolver';

const routes: Routes = [
  // /sobre
  {
    path: '', component: AboutComponent,
    resolve: {
      aboutPage: AboutPageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
