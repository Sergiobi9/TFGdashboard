import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { LoginComponent } from "./login/login.component";
import { AuthorizatedGuard } from "./guards/authorized.guard";

export const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" },
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
      canActivate:[AuthorizatedGuard]
  },
  {
    path: "auth",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: NbRegisterComponent,
      },
      {
        path: "logout",
        component: NbLogoutComponent,
      },
      {
        path: "request-password",
        component: NbRequestPasswordComponent,
      },
      {
        path: "reset-password",
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: "**", component: LoginComponent },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
