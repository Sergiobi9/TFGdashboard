import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FooterComponent } from "../components/footer/footer.component";
import { HeaderComponent } from "../components/header/header.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";

const PAGES_COMPONENTS = [
    PagesComponent,
  ];

@NgModule({
  imports: [PagesRoutingModule],

  providers: [],
  declarations: [...PAGES_COMPONENTS, HeaderComponent, FooterComponent],
  entryComponents: [],
})
export class PagesModule {}
