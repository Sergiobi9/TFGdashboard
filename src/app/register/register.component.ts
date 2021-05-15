import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Session } from "../models/session.model";
import { StorageService } from "../services/storage.service";

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [StorageService],
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;

  email = "";
  password = "";

  step = 4;
  steps = 5;
  width = ((this.step + 1) / this.steps) * 100 + "%";
  choosePhotoInput: any = null;
  mbLimit = 1000000;
  fileMaxSizeAllowed = 1000000;

  bio = "";
  artistImage: any =
    "https://images.sk-static.com/images/media/profile_images/artists/8508053/huge_avatar";

  constructor(private storage: StorageService, private router: Router) {
    console.log(this.width);
  }

  ngOnInit(): void {}

  uploadImage() {
    if (this.choosePhotoInput !== null) {
      this.choosePhotoInput.click();
    }
  }

  proceedStep() {
    this.step++;
    this.width = ((this.step + 1) / this.steps) * 100 + "%";
  }

  goBack() {
    if (this.step == 0) {
      this.router.navigate(["/auth/login"]);
    } else {
      this.step--;
      this.width = ((this.step + 1) / this.steps) * 100 + "%";
    }
  }

  fileBrowseHandler($event: any) {
    console.log("hello")
    var selectedFile = $event.target.files[0];
    var reader = new FileReader();

    var that = this;
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
      that.artistImage = file;
    };
    reader.readAsDataURL(selectedFile);
  }
}
