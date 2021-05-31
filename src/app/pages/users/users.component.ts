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
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-users",
  styleUrls: ["./users.component.scss"],
  templateUrl: "./users.component.html",
})
export class UsersComponent implements OnDestroy, OnInit {

  constructor(
  ) {
  
  }

  ngOnDestroy(): void {
  }
  ngOnInit(): void {
  }
}
