import {Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {

  private alive = true;
  userId = JSON.parse(localStorage.getItem('currentUser')).user.id;

  imageUrl;

  constructor(private router: Router) {
    console.log(this.userId);
    this.imageUrl = "https://artists-tfg.s3.us-east-2.amazonaws.com/" + this.userId + ".png";
  }

  ngOnDestroy() {
    this.alive = false;
  }

  createConcert(){
    this.router.navigate(["/pages/new/concert"]);
  }
}
