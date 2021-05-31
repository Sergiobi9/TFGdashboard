import {Component, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { ConcertsService } from '../../services/concert.service';
import { ManageConcert } from './dialog/manage-concert.component';

@Component({
  selector: 'ngx-concerts',
  styleUrls: ['./concerts.component.scss'],
  templateUrl: './concerts.component.html',
  providers:[ConcertsService]
})
export class ConcertsComponent {

  nextConcert;
  featuringConcerts = [];
  createdConcerts= [];
  finishedConcerts= [];

  constructor(private router: Router, private concertsService: ConcertsService, public dialog: MatDialog) {
    this.concertsService.getArtistNextConcert().pipe().subscribe((data: any)=>{
      console.log(data)
      this.nextConcert = data;
    });

    this.concertsService.getArtistFeaturingConcerts().pipe().subscribe((data: any)=>{
      this.featuringConcerts = data;
    });

    this.concertsService.getArtistCreatedConcerts().pipe().subscribe((data: any)=>{
      this.createdConcerts = data;
    });

    this.concertsService.getArtistFinishedConcerts().pipe().subscribe((data: any)=>{
      console.log(data)
      this.finishedConcerts = data;
    });
  }

  manageConcert() {
    const dialogRef = this.dialog.open(ManageConcert, {
      maxWidth: "650px",
      data: {
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
    
    });
  }


  ngOnDestroy() {
  }

  imageUrl ="https://concerts-images-tfg.s3.us-east-2.amazonaws.com/605bc026b2d5497a8393bf0b_0.png";

  createConcert(){
    this.router.navigate(["/pages/new/concert"]);
  }
}
