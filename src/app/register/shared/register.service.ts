import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Session } from "../../models/session.model";
import { UserArtist } from "../register.component";

@Injectable()
export class RegisterService {
  
  constructor(private http: HttpClient) {}

  registerArtist(userArtist: UserArtist,) {
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.http.post(environment.apiUrl + "user/create/artist", userArtist, {
      headers,
    });
  }

  checkIfArtistExist(email: string,) {
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.http.get(environment.apiUrl + `user/artist/existing/${email}`, {
      headers,
    });
  }
}
