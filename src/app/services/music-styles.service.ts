import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class MusicStylesService {
  
  constructor(private http: HttpClient) {}

  getMusicStyles() {
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.http.get(environment.apiUrl + "music/style/all", {
      headers,
    });
  }
}
