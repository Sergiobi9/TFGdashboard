import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  faUser,
  faLock,
  faEnvelope,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { COUNTRIES } from "src/app/constants/countries/countries";
import { GENDER_LIST } from "src/app/constants/gender/gender";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faEmail = faEnvelope;
  faLongArrowAltLeft = faLongArrowAltLeft;

  artistImage: any= "https://images.sk-static.com/images/media/profile_images/artists/8508053/huge_avatar";
  fileMaxSizeAllowed = 1000000;

  listOfCountries = COUNTRIES;
  listOfGenders = GENDER_LIST;

  registerStep = 1;

  registerArtistName = "";
  registerEmail = "";

  registerPassword = "";
  registerConfirmPassword = "";

  registerBirthday = "";

  registerGender = -2;
  registerCountry = "";

  choosePhotoInput: any = null;
  mbLimit = 1000000;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
  }

  proceedSignUpStep() {
    switch (this.registerStep) {
      case 1:
        if (!this.isArtistNameCorrect(this.registerArtistName)) {
          return;
        }

        if (!this.isEmailCorrect(this.registerEmail)) {
          return;
        }

        this.registerStep = 2;
        break;
      case 2:
        if (!this.arePasswordsMatching()) {
          return;
        }

        this.registerStep = 3;
        break;
      case 3:

        var that = this;

        setTimeout(() => {
          that.choosePhotoInput = document.getElementById("choosePhoto");
        }, 1000);
        this.registerStep = 4;
        break;
    }
  }

  genderSelectHandler(genderSelected: any) {
    console.log(this.registerGender);
  }

  countrySelectHandler(countrySelected: any) {
    console.log(this.registerCountry);
  }

  uploadImage() {
    if (this.choosePhotoInput !== null) {
      this.choosePhotoInput.click();
    }
  }

  isFirstScreen() {
    return this.registerStep === 1;
  }

  goBackSignUpStep() {
    if (this.isFirstScreen()) {
      this.router.navigateByUrl("/login");
      return;
    }

    this.registerStep--;
  }

  isEmailCorrect(email: string) {
    return email !== null && email !== "";
  }

  isArtistNameCorrect(artistName: any) {
    return artistName !== null && artistName !== "";
  }

  arePasswordsMatching() {
    return this.registerPassword === this.registerConfirmPassword;
  }

  fileBrowseHandler($event: any) {
    var selectedFile = $event.target.files[0];
    var reader = new FileReader();

    var that = this;
    reader.onload = function (event) {

      var file: any = event !== null && event.target !== null ? event.target.result : "";
      var size: any = event !== null ? event.total : 0;

      if (!file.toUpperCase().includes("JPEG") && !file.toUpperCase().includes("PNG") && !file.toUpperCase().includes("JPG")) {
        console.log("This image is not a PNG, JPG or JPEG format. Please choose another file.")
        return;
      }
      else if (size > that.fileMaxSizeAllowed) {
        console.log("This image is to big. File size limit is 1MB. Please choose another file")
        return;
      }
      that.artistImage = file;
    };

    reader.readAsDataURL(selectedFile);
  }
}
