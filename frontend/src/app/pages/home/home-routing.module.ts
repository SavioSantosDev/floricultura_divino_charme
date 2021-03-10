import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageHomeResolver } from 'src/app/guards/resolvers/pages-resolvers/page-home.resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    resolve: {
      pageHome: PageHomeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
