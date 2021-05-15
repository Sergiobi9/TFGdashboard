import { Component } from "@angular/core";

@Component({
  selector: "ngx-footer",
  styleUrls: ["./footer.component.scss"],
  template: `
    <img
      src="../../../../assets/images/tfg_app_logo.png"
      style="width:20px; height:20px; margin-right:5px"
    />
    <span class="created-by" style="margin-left:5px"> Stereo </span>
  `,
})
export class FooterComponent {}
