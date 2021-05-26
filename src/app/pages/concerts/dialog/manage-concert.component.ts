import { Component } from "@angular/core";
import { Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "ngx-manage-concert.",
  templateUrl: "./manage-concert.component.html",
  styleUrls: ["./manage-concert.component.scss"],
  providers: [],
})
export class ManageConcert {
  errorAlert = false;
  errorMessage = "";

  testName = "";

  constructor(
    private dialogRef: MatDialogRef<ManageConcert>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
