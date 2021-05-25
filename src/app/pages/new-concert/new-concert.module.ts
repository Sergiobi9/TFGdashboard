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
import { NewConcertComponent } from './new-concert.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgmCoreModule } from '@agm/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AwsFileUploaderService } from './shared/aws-file-uploader.service';
import { ArtistService } from './shared/artist.service';

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
    NewConcertComponent,
  ],
  providers:[AwsFileUploaderService, ArtistService]
})
export class NewConcertModule { }
