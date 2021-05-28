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
  NbDatepickerModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ProfileComponent } from './profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    IvyCarouselModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbDatepickerModule,
    MatNativeDateModule,
    FontAwesomeModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgxEchartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmlBOwJRh5ddymsepGgf-pUjG2dqAuZhw'
    }),
  ],
  declarations: [
    ProfileModule,
  ],
})
export class ProfileModule { }
