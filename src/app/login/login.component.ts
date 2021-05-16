import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Session } from '../models/session.model';
import { StorageService } from '../services/storage.service';
import { AuthenticationService } from './shared/authentication.service';
import { LoginObject } from './shared/login-object.model';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthenticationService, StorageService]
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;

  email = "";
  password = "";


  constructor(private auth: AuthenticationService, private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  errorAlert = false;
  errorAlertMessage = "";

  hideErrorAlert(){
    this.errorAlert = false
  }

  showErrorMessage(message){
    this.errorAlert = true;
    this.errorAlertMessage = message;
  }

  doLogin(){
    this.hideErrorAlert();

    const loginObject: LoginObject = new LoginObject(this.email, this.password);
    this.auth.login(loginObject).pipe().subscribe((data: any) =>{
      if (data.info != null && data.info === "user do not exist"){
        this.showErrorMessage("user do not exist");
      } else if (data.info != null && data.info ==="user has to register as artist"){
        this.showErrorMessage("user has to register as artist");
      } else {
        this.storage.setCurrentSession(data)
        this.router.navigate(['/pages/home']);
      }
      //
    }, err =>{
      if (err.status === 401){
        this.showErrorMessage("Email or password are not correct");
      }
    });
  }

  registerAsArtist(){
    this.router.navigate(['/auth/register/artist']);
  }

}
