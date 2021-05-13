import {Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import {
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-new-concert',
  styleUrls: ['./new-concert.component.scss'],
  templateUrl: './new-concert.component.html',
})
export class NewConcertComponent implements OnDestroy {

  name = "";
  lat = 19.290950;
  lng = -99.653015;
  zoom = 9;

  faCloudUploadAlt = faCloudUploadAlt;

  constructor(private router: Router) {

  }

  ngOnDestroy() {
  }

  imageUrl ="https://concerts-images-tfg.s3.us-east-2.amazonaws.com/605bc026b2d5497a8393bf0b_0.png";

  createConcert(){
    this.router.navigate(["/pages/new/concert"]);
  }
}
