import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { ConcertsComponent } from './concerts.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ConcertsService } from './shared/concerts.service';
import { YearConcertPipe } from './pipe/year-concert.pipe';
import { DayConcertPipe } from './pipe/date-concert.pipe';
import { ManageConcert } from './dialog/manage-concert.component';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    FormsModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    IvyCarouselModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
  ],
  declarations: [
    ConcertsComponent,
    YearConcertPipe,
    DayConcertPipe,
    ManageConcert
  ],
  entryComponents:[ManageConcert],
  providers:[ConcertsService]
})
export class ConcertsModule { }
