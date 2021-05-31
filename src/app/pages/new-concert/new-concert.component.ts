import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";
import { SolarData } from "../../@core/data/solar";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { MapsAPILoader } from "@agm/core";
import { ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ElementRef } from "@angular/core";
import { AwsFileUploaderService } from "./shared/aws-file-uploader.service";
import { ArtistService } from "./shared/artist.service";

import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { ConcertRegister, ConcertsService } from "../../services/concert.service";
import { DateUtilsHelper } from "../../../utils/date-utils";
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-new-concert",
  styleUrls: ["./new-concert.component.scss"],
  templateUrl: "./new-concert.component.html",
  providers: [AwsFileUploaderService, ArtistService, ConcertsService],
})
export class NewConcertComponent implements OnDestroy, OnInit {
  name = "";
  latitude = 19.29095;
  longitude = -99.653015;
  address = "";
  zoom = 9;

  hora;

  locationGranted = true;

  extraDescription = "";
  description = "";
  imagesCover =
    "https://s3.amazonaws.com/media.thecrimson.com/photos/2020/04/02/211518_1343746.jpg";

  concert = new ConcertRegister();

  private geoCoder;
  images = [];

  faCloudUploadAlt = faCloudUploadAlt;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  artists = [];
  allArtists = [];

  constructor(
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private awsFileUploaderService: AwsFileUploaderService,
    private artistService: ArtistService,
    private concertService: ConcertsService
  ) {
    this.artistService
      .getArtists()
      .pipe()
      .subscribe((data: any) => {
        this.artists = data;
        this.allArtists = data;

        this.artists = this.artists.slice(0, 10);

        for (let i = 0; i < this.allArtists.length; i++) {
          this.allArtists[i].opacity = 1;
        }

        console.log(this.artists);
      });
  }

  faCheckCircle = faCheckCircle;

  mbLimit = 1000000;
  fileMaxSizeAllowed = 1000000;

  selectArtist(artist) {
    console.log("selected");
    var artistId = artist.artistId;
    for (let i = 0; i < this.allArtists.length; i++) {
      var currentArtistId = this.allArtists[i].artistId;

      if (currentArtistId === artistId) {
        this.allArtists[i].opacity = this.allArtists[i].opacity ? 1 : 0.5;
      }
    }

    for (let i = 0; i < this.artists.length; i++) {
      var currentArtistId = this.artists[i].artistId;
      if (currentArtistId === artistId) {
        this.artists[i].opacity = !this.artists[i].opacity ? 1 : 0.5;
      }
    }

    console.log(this.allArtists);
  }

  getPlaceAutocomplete() {
    this.searchControl = new FormControl();
    this.setCurrentLocation();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement as HTMLInputElement,
        {
          types: [],
          //componentRestrictions: { 'country' : 'ES' }
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          console.log(place);
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;

          this.concert.latitude = this.latitude;
          this.concert.longitude = this.longitude;
          this.concert.placeAddress = this.address;
          this.concert.placeName = place.name;
        });
      });
    });
  }

  fileBrowseHandlerCover($event: any) {
    console.log("hello");
    var that = this;

    var currentFile = $event.target.files[0];
    var reader = new FileReader();
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
      that.imagesCover = file;
    };
    reader.readAsDataURL(currentFile);
  }

  fileBrowseHandler($event: any) {
    console.log("hello");
    var selectedFiles = $event.target.files;

    this.images = [];

    for (let i = 0; i < selectedFiles.length && i < 4; i++) {
      var that = this;

      var currentFile = selectedFiles[i];
      var reader = new FileReader();
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
        that.images.push(file);
      };
      reader.readAsDataURL(currentFile);
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    const that = this;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 8;
          this.getAddress(this.latitude, this.longitude);
        },
        (error) => {
          that.locationGranted = false;
          var lat = Math.random() * (43.2 - 37.16 + 1) + 37.16;
          var lng = -(Math.random() * (1.1 - 0.9 + 1) + 0.9);
          console.log("setting random lat", lat);
          console.log("setting random lng", lng);

          that.latitude = lat;
          that.longitude = lng;
          that.zoom = 8;
          that.getAddress(that.latitude, that.longitude);
        },
        {
          maximumAge: 60000,
          timeout: 5000,
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("geolocation not in navigator");
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  artistSearchTerm = "";
  onArtistParticipatingInputChange(value) {
    value = value.toLowerCase();
    this.artists = [];
    var idsController = [];

    for (let i = 0; i < this.allArtists.length; i++) {
      if (
        this.allArtists[i].artistName.toString().toLowerCase().includes(value)
      ) {
        var id = this.allArtists[i].artistId;

        if (!idsController.includes(id)) {
          this.artists.push(this.allArtists[i]);
          idsController.push(id);
        }
      }
    }

    if (value == "" && this.artists.length == this.allArtists.length) {
      this.artists = this.artists.slice(0, 10);
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
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
      }
    );
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.mapsAPILoader.load().then(() => {
        this.getPlaceAutocomplete();
        this.geoCoder = new google.maps.Geocoder();
      });
    }, 1000);
  }

  ngOnDestroy() {}

  errorAlert = false;
  errorMessage = "";

  hideErrorMessage() {
    this.errorAlert = false;
  }

  showErrorMessage(message) {
    this.errorAlert = true;
    this.errorMessage = message;
    this.successAlert = false;
  }

  block = false;

  imageUrl =
    "https://concerts-images-tfg.s3.us-east-2.amazonaws.com/605bc026b2d5497a8393bf0b_0.png";

  createConcert() {
    this.hideErrorMessage();

    var errors = this.checkInputs();

    if (errors){ return }

    var artistsIds = [];
    for (let i = 0; i < this.allArtists.length; i++) {
      if (this.allArtists[i].opacity == 0.5) {
        artistsIds.push(this.allArtists[i].artistId);
      }
    }

    this.concert.numberImages = this.images.length;
    this.concert.artistsIds = artistsIds;

    var dateStarts = this.concert.dateStarts;
    this.concert.dateStarts = this.concert.dateStarts + " " + this.hora + ":00.000+0100";
    this.concert.dateCreated = DateUtilsHelper.timeStamp();

    this.showSuccessMessage("Creando concierto, por favor espera")

    if (!this.block){
      this.block = true;
      this.concertService.registerConcert(this.concert).pipe().subscribe((data:any)=>{
        this.concert.dateStarts = dateStarts;
        var concertId = data.id;
        this.showSuccessMessage("Concierto creado. Por favor espera, se esta subiendo la imagen cover.")
        this.awsFileUploaderService.uploadConcertImageToS3(this.imagesCover, concertId, this)
      }, err =>{
        this.block = false;
        this.concert.dateStarts = dateStarts;
        this.showErrorMessage("Vaya algo ha ido mal creando el concierto, prueba de nuevo más tarde")
      });
    }
  }

  uploadConcertPlaceImages(id){
    if (this.images != null && this.images.length == 0){
      this.successRegister();
    } else {
      this.showSuccessMessage("Por favor espera, se estan subiendo las imagenes del sitio del concierto")
      for (let i = 0; i < this.images.length; i++){
        var file = this.images[i];
  
        var isLastItem = i == this.images.length-1;
        this.awsFileUploaderService.uploadConcertPlaceImagesToS3(file, id, i, isLastItem, this)
      }  
    }
  }

  successAlert = false;
  successMessage = "";

  hideSuccessMessage() {
    this.successAlert = false;
  }

  showSuccessMessage(message) {
    this.successAlert = true;
    this.successMessage = message;
    this.errorAlert = false;
  }


  successRegister(){
    this.showErrorMessage("Concierto registrado correctamente. Redirigiendote a conciertos ..")
    setTimeout(() => {
      this.router.navigate(["/pages/concerts"]);
    }, 1000);
  }

  checkInputs() {
    console.log(this.concert.dateStarts)
    if (this.concert.name === "") {
      this.showErrorMessage("Por favor, pon un nombre a tu concierto");
      return true;
    } else if (this.concert.dateStarts === "") {
      this.showErrorMessage("Por favor, pon una fecha a tu concierto");
      return true;
    } else if (!DateUtilsHelper.checkDateFormat(this.concert.dateStarts)) {
      this.showErrorMessage(
        "Por favor, pon una fecha valida con formato YYYY-MM-DD tu concierto"
      );
      return true;
    } else if (this.hora === "" ) {
      this.showErrorMessage("Por favor, pon una hora de inicio a tu concierto");
      return true;
    } else if (!DateUtilsHelper.checkHourFormat(this.hora)) {
      this.showErrorMessage(
        "Por favor, pon una hora de inicio valida con formato HH:MM a tu concierto"
      );
      return true;
    } else if (
      this.imagesCover == null ||
      this.imagesCover ==
        "https://s3.amazonaws.com/media.thecrimson.com/photos/2020/04/02/211518_1343746.jpg"
    ) {
      this.showErrorMessage(
        "Por favor, selecciona una foto cover para tu concierto"
      );
      return true;
    } else if (
     this.concert.placeName == ""
    ) {
      this.showErrorMessage(
        "Por favor, escribe una ubicación en la que se va a dar lugar el concierto"
      );
      return true;
    } else if (
      this.concert.numberAssistants < 0
     ) {
       this.showErrorMessage(
         "Por favor, selecciona un numero de asistentes valido"
       );
       return true;
     } else if (
      this.concert.price < 0 || this.concert.price == null
     ) {
       this.concert.price = 0;
     }

     return false;
  }
}
