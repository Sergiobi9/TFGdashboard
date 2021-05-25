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
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookedTicketsPipe } from './pipe/booked-tickets.pipe';
import { FirstNameLetterPipe } from './pipe/first-name-letter.pipe';
import { ConcertRatePipe } from './pipe/concert-rate.pipe';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    FontAwesomeModule,
    NgxEchartsModule,
  ],
  declarations: [
    HomeComponent,
    BookedTicketsPipe,
    FirstNameLetterPipe,
    ConcertRatePipe
  ],
})
export class HomeModule { }
