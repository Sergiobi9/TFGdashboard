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

  doLogin(){
    const loginObject: LoginObject = new LoginObject(this.email, this.password);
    this.auth.login(loginObject).pipe().subscribe((data: Session) =>{
      this.storage.setCurrentSession(data);
      console.log("sucess")
      this.router.navigate(['/pages/home']);
    });
  }

  registerAsArtist(){
    this.router.navigate(['/auth/register/artist']);
  }

}
