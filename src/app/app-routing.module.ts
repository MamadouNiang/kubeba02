import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./pages/examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./pages/examples/landingpage/landingpage.component";
import { HeaderComponent } from "./pages/examples/header/header.component";
import { AnnonceListComponent } from "./pages/examples/dashbord/annonce-list/annonce-list.component";
import { AnnonceFormComponent } from "./pages/examples/dashbord/annonce-list/annonce-form/annonce-form.component";
import { SingleAnnonceComponent } from "./pages/examples/dashbord/annonce-list/single-annonce/single-annonce.component";
import { DashbordComponent } from "./pages/examples/dashbord/dashbord.component";
import { MessagesComponent } from "./pages/examples/messages/messages.component";
import { UsersComponent } from "./pages/examples/users/users.component";

import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "register", component: RegisterpageComponent },
  { path: "header", component: HeaderComponent },
  {
    path: "dashbord",
    canActivate: [AuthGuardService],
    component: DashbordComponent,
  },
  {
    path: "users",
    canActivate: [AuthGuardService],
    component: UsersComponent,
  },
  {
    path: "messages",
    canActivate: [AuthGuardService],
    component: MessagesComponent,
  },
  {
    path: "profile",
    canActivate: [AuthGuardService],
    component: ProfilepageComponent,
  },
  {
    path: "annonces",
    canActivate: [AuthGuardService],
    component: AnnonceListComponent,
  },
  {
    path: "annonces/new",
    canActivate: [AuthGuardService],
    component: AnnonceFormComponent,
  },
  {
    path: "annonces/view/:id",
    canActivate: [AuthGuardService],
    component: SingleAnnonceComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [],
})
export class AppRoutingModule {}
