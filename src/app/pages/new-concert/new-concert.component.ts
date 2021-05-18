import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import {
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import { MapsAPILoader } from '@agm/core';
import { ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { AwsFileUploaderService } from './shared/aws-file-uploader.service';
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-new-concert',
  styleUrls: ['./new-concert.component.scss'],
  templateUrl: './new-concert.component.html',
  providers:[AwsFileUploaderService]
})
export class NewConcertComponent implements OnDestroy, OnInit {

  name = "";
  latitude = 19.290950;
  longitude = -99.653015;
  address = "";
  zoom = 9;

  locationGranted = true;

  private geoCoder;

  faCloudUploadAlt = faCloudUploadAlt;
  
  @ViewChild('search')
  public searchElementRef: ElementRef;

  public searchControl: FormControl;

  constructor(private router: Router, 
    private mapsAPILoader: MapsAPILoader, 
    private ngZone: NgZone,
    private awsFileUploaderService: AwsFileUploaderService) {

  }

  images = "";
  mbLimit = 1000000;
  fileMaxSizeAllowed = 1000000;
  
  getPlaceAutocomplete() {
    this.searchControl = new FormControl();
    this.setCurrentLocation();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement as HTMLInputElement, {
        types: [],
        //componentRestrictions: { 'country' : 'ES' }
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat()
          this.longitude = place.geometry.location.lng()
          this.address = place.formatted_address
        })
      })
    })
  }

  fileBrowseHandler($event: any) {
    console.log("hello")
    var selectedFile = $event.target.files[0];
    var reader = new FileReader();

    var that = this;
    reader.onload = function (event) {
      var file: any =
        event !== null && event.target !== null ? event.target.result : "";
      var size: any = event !== null ? event.total : 0;

      if (
        !file.toUpperCase().includes("JPEG") &&
        !file.toUpperCase().includes("PNG") &&
        !file.toUpperCase().includes("JPG")
      ) {
        console.log(
          "This image is not a PNG, JPG or JPEG format. Please choose another file."
        );
        return;
      } else if (size > that.fileMaxSizeAllowed) {
        console.log(
          "This image is to big. File size limit is 1MB. Please choose another file"
        );
        return;
      }
      that.images = file;
    };
    reader.readAsDataURL(selectedFile);
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    const that = this
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      },(error) => {
        that.locationGranted = false;
        var lat = (Math.random() * (43.20 - 37.16 + 1) + 37.16);
        var lng = - (Math.random() * (1.1 - 0.9 + 1) + 0.9);
        console.log("setting random lat", lat)
        console.log("setting random lng", lng)

        that.latitude = lat
        that.longitude = lng
        that.zoom = 8;
        that.getAddress(that.latitude, that.longitude);
      }, {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true
      });
    } else {
      console.log("geolocation not in navigator")
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          if (this.locationGranted) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            this.zoom = 3;
            this.address = results[0].formatted_address;
          }

        } else {
          //window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.mapsAPILoader.load().then(() => {
        this.getPlaceAutocomplete();
        this.geoCoder = new google.maps.Geocoder;
      });
    }, 1000);
    
  }

  ngOnDestroy() {
  }

  imageUrl ="https://concerts-images-tfg.s3.us-east-2.amazonaws.com/605bc026b2d5497a8393bf0b_0.png";

  createConcert(){
    this.router.navigate(["/pages/new/concert"]);
  }
}
