import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [
     {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, {
        path: '**',
        component: NotFoundComponent,
      }
    ],
  }];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PagesRoutingModule {
  }