import {Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { HomeService } from './shared/home.service';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar} from '@fortawesome/free-solid-svg-icons';

import { faStar as outlineStar} from '@fortawesome/free-regular-svg-icons';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  providers:[HomeService]
})
export class HomeComponent implements OnDestroy {

  faStarHalfAlt = faStarHalfAlt;
  solidStar = solidStar;
  outlineStar = outlineStar;

  rating = 3.5;

  private alive = true;
  userId = JSON.parse(localStorage.getItem('currentUser')).user.id;
  artistName = JSON.parse(localStorage.getItem('currentUser')).artist.artistName;



  imageUrl;

  activity = [];

  constructor(private router: Router, private homeService: HomeService) {
    this.imageUrl = "https://artists-tfg.s3.us-east-2.amazonaws.com/" + this.userId + ".png";

    this.homeService.getUserConcertsActivityByArtist().pipe().subscribe((data: any)=>{
      console.log(data)
      this.activity = data;
      this.activity = this.activity.slice(0, 5);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  createConcert(){
    this.router.navigate(["/pages/new/concert"]);
  }
}
