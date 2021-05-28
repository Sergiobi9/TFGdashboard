import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeModule } from './home/home.module';
import { ConcertsModule } from './concerts/concerts.module';
import { NewConcertModule } from './new-concert/new-concert.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    HomeModule,
    ConcertsModule,
    NewConcertModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
