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
import { StatusCardComponent } from './status-card/status-card.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperatureDraggerComponent } from './temperature/temperature-dragger/temperature-dragger.component';
import { KittenComponent } from './kitten/kitten.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { ElectricityChartComponent } from './electricity/electricity-chart/electricity-chart.component';
import { WeatherComponent } from './weather/weather.component';
import { SolarComponent } from './solar/solar.component';
import { PlayerComponent } from './rooms/player/player.component';
import { TrafficComponent } from './traffic/traffic.component';
import { TrafficChartComponent } from './traffic/traffic-chart.component';
import { FormsModule } from '@angular/forms';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NewConcertComponent } from './new-concert.component';
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
    MatNativeDateModule,
    FontAwesomeModule,
    MatDatepickerModule,
    NgxEchartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDmlBOwJRh5ddymsepGgf-pUjG2dqAuZhw'
    }),
  ],
  declarations: [
    NewConcertComponent,
    StatusCardComponent,
    TemperatureDraggerComponent,
    ContactsComponent,
    RoomSelectorComponent,
    TemperatureComponent,
    RoomsComponent,
    KittenComponent,
    ElectricityComponent,
    ElectricityChartComponent,
    WeatherComponent,
    PlayerComponent,
    SolarComponent,
    TrafficComponent,
    TrafficChartComponent,
  ],
})
export class NewConcertModule { }
