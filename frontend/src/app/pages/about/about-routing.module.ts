import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';
import { PageAboutResolver } from 'src/app/guards/resolvers/pages-resolvers/page-about.resolver';

const routes: Routes = [
  // /sobre
  {
    path: '', component: AboutComponent,
    resolve: {
      pageAbout: PageAboutResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
