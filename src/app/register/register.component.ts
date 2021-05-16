import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Session } from "../models/session.model";
import { MusicStylesService } from "../services/music-styles.service";
import { StorageService } from "../services/storage.service";
import { RegisterService } from "./shared/register.service";

export class UserArtist{
    firstName: string = "";
    lastName:string = "";
    country: string = "";
    city: string = "";
    zipCode: string = "";
    gender: number = -1;
    birthday: string = "";
    email: string = "";
    password: string = "";
    artistName: string = "";
    bio: string = "";
    musicalStyleId: string = "";
    artistSince: string = "";
}

@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  providers: [StorageService, MusicStylesService, RegisterService],
})

export class RegisterComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;

  email = "";
  password = "";

  styles: any;

  userArtist: UserArtist = new UserArtist();

  step = 0;
  steps = 5;
  width = ((this.step + 1) / this.steps) * 100 + "%";
  choosePhotoInput: any = null;
  mbLimit = 1000000;
  fileMaxSizeAllowed = 1000000;

  bio = "";
  artistImage: any = "../../assets/images/user.png";

  constructor(private storage: StorageService, 
    private router: Router, 
    private musicStyleService: MusicStylesService,
    private register: RegisterService) {
    console.log(this.width);

    this.musicStyleService.getMusicStyles().pipe().subscribe((data) =>{ 
      console.log(data)
      this.styles = data;
    });
  }

  ngOnInit(): void {}

  uploadImage() {
    this.step++;
  }

  errorAlert = false;
  errorAlertMessage = "";

  passwordConfirm = "";

  proceedStep() {

    this.hideErrorAlert();
    if (this.step === 0){
      if (this.userArtist.firstName === ""){
        this.showErrorAlert("El campo nombre es necesario")
        return;
      } else if (this.userArtist.lastName === ""){
        this.showErrorAlert("El campo apellido es necesario")
        return;
      } else if (this.userArtist.email   === ""){
        this.showErrorAlert("El campo email es necesario")
        return;
      }

    } else if (this.step === 1){
      if (this.userArtist.password.length < 8){
        this.showErrorAlert("La contraseña debe tener minimo ocho caracteres")
        return;
      }
      else if (this.userArtist.password !== this.passwordConfirm){
        this.showErrorAlert("Las contraseñas no coinciden")
        return;
      } 
    } else if (this.step === 2){
      if (this.userArtist.birthday === ""){
        this.showErrorAlert("El campo fecha de nacimiento es necesario")
        return;
      }
      else if (this.userArtist.country === ""){
        this.showErrorAlert("El campo país es necesario")
        return;
      } 
    } else if (this.step === 3){
      if (this.userArtist.artistName === ""){
        this.showErrorAlert("El campo nombre artistico es necesario")
        return;
      }
      else if (this.userArtist.musicalStyleId === ""){
        this.showErrorAlert("Selecciona un género musical")
        return;
      }
      else if (this.userArtist.musicalStyleId === ""){
        this.showErrorAlert("El campo artista desde es necesario")
        return;
      }
      else if (this.userArtist.musicalStyleId === ""){
        this.showErrorAlert("El campo bio es necesario")
        return;
      }  
    } else if (this.step === 4){
      if (this.artistImage === "" || this.artistImage === "../../assets/images/user.png"){
        this.showErrorAlert("Por favor, selecciona una foto")
        return;
      }

      this.registerArtist();
    }

    if (this.step !== 4 && this.step !== 0){
      this.step++;
    } else if (this.step === 0){
      this.checkEmailExistsWhenRegisterArtist();
    }
    this.width = ((this.step + 1) / this.steps) * 100 + "%";

  }

  checkEmailExistsWhenRegisterArtist(){
    this.register.checkIfArtistExist(this.userArtist.email).pipe().subscribe((data: any) => {
      if (data.info === "ARTIST ALREADY EXISTS"){
        this.showErrorAlert("There is already an artist with this email")
      } else {
        this.step++;
      }
    });
  }

  registerArtist(){
    this.register.registerArtist(this.userArtist).pipe().subscribe((data:Session) =>{
      this.storage.setCurrentSession(data);
      this.uploadImage();
    });
  }

  showErrorAlert(message){
    this.errorAlert = true;
    this.errorAlertMessage = message;
  }

  hideErrorAlert(){
    this.errorAlert = false;
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

  onGenderSelected(value){
    this.userArtist.gender = Number(value);
    console.log(this.userArtist);
  }

  onCountrySelected(value){
    this.userArtist.country = value;
    console.log(this.userArtist);
  }

  selectSince(value){
    console.log(value);
  }

  doLogin(){
    this.router.navigate(["/pages/home"]);
  }

  onMusicStyleSelected(value){
    this.userArtist.musicalStyleId = value;
  }
}
