import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { DateUtilsHelper } from "../../utils/date-utils";

export class ConcertRegister{
    name = "";
    latitude= 0;
    longitude = 0;
    placeName = "";
    placeAddress = "";
    placeDescription = "";
    dateCreated = "";
    dateStarts = "";
    userId = "";
    price = 0;
    numberAssistants = 0;
    description = "";
    extraDescription = "";
    finished = false;
    numberImages = 0;
    artistsIds = [];
}

@Injectable()
export class ConcertsService {
  constructor(private http: HttpClient) {}

  getArtistCreatedConcerts() {
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    var artistId = JSON.parse(localStorage.getItem("currentUser")).user.id;
    var currentDate = DateUtilsHelper.timeStamp();

    return this.http.get(environment.apiUrl + `concert/all/hosting/artistId/${artistId}/${currentDate}`, {
      headers,
    });
  }

  getArtistFinishedConcerts() {
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    var artistId = JSON.parse(localStorage.getItem("currentUser")).user.id;
    var currentDate = DateUtilsHelper.timeStamp();

    return this.http.get(environment.apiUrl + `concert/all/finished/artistId/${artistId}/${currentDate}`, {
      headers,
    });
  }

  getArtistNextConcert() {
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    var artistId = JSON.parse(localStorage.getItem("currentUser")).user.id;
    var currentDate = DateUtilsHelper.timeStamp();

    return this.http.get(environment.apiUrl + `concert/next/artistId/${artistId}/${currentDate}`, {
      headers,
    });
  }

  getArtistFeaturingConcerts(){
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    var artistId = JSON.parse(localStorage.getItem("currentUser")).user.id;
    var currentDate = DateUtilsHelper.timeStamp();

    return this.http.get(environment.apiUrl + `concert/all/featuring/artistId/${artistId}/${currentDate}`, {
      headers,
    });
  }
}