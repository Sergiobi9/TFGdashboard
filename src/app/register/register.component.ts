import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Session } from '../models/session.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[StorageService]
})
export class RegisterComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;

  email = "";
  password = "";

  step = 0;
  steps = 5;
  width = (this.step + 1)/this.steps * 100 + "%";

  bio = "";

  constructor(private storage: StorageService, private router: Router) { 
    console.log(this.width)
  }

  ngOnInit(): void {
  }

  proceedStep(){
    this.step++;
    this.width = (this.step + 1)/this.steps * 100 + "%";
  }

  goBack(){
    if (this.step == 0){
      this.router.navigate(['/auth/login']);
    } else {
      this.step--;
      this.width = (this.step + 1)/this.steps * 100 + "%";
    }
  }


}
