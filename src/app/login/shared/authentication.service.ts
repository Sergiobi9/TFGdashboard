import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Session } from "../../models/session.model";
import { LoginObject } from "./login-object.model";

@Injectable()
export class AuthenticationService {
  
  constructor(private http: HttpClient) {}

  login(loginObj: LoginObject) {
    var headers = new HttpHeaders();
    headers.append("Content-type", "application/json");

    return this.http.post(environment.apiUrl + "auth/login", loginObj, {
      headers,
    });
  }
}
