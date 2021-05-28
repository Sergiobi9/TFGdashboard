import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AuthorizatedGuard } from '../guards/authorized.guard';
import { ConcertsComponent } from './concerts/concerts.component';
import { NewConcertComponent } from './new-concert/new-concert.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'concerts',
      component: ConcertsComponent,
    },
    {
      path: 'new/concert',
      component: NewConcertComponent,
    },
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      //path: '**',
      //component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
