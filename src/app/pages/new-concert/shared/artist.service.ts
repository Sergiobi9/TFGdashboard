import * as AWS from "aws-sdk/global";
import * as S3 from "aws-sdk/clients/s3";
import { environment } from "../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class ArtistService {
  constructor(private http: HttpClient) {}

  getArtists() {
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    var userId = JSON.parse(localStorage.getItem("currentUser")).user.id;

    return this.http.get(environment.apiUrl + `artist/all/${userId}`, {
      headers,
    });
  }
}
