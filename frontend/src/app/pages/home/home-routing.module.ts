import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageResolver } from 'src/app/guards/resolvers/pages-resolvers/home-page.resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    resolve: {
      homePage: HomePageResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
