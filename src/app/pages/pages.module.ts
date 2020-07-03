import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./examples/profilepage/profilepage.component";
import { RegisterpageComponent } from "./examples/registerpage/registerpage.component";
import { LandingpageComponent } from "./examples/landingpage/landingpage.component";
import { HeaderComponent } from "./examples/header/header.component";
import { DashbordComponent } from "./examples/dashbord/dashbord.component";
import { AnnonceListComponent } from "./examples/dashbord/annonce-list/annonce-list.component";
import { SingleAnnonceComponent } from "./examples/dashbord/annonce-list/single-annonce/single-annonce.component";
import { AnnonceFormComponent } from "./examples/dashbord/annonce-list/annonce-form/annonce-form.component";
import { FooterComponent } from "./examples/footer/footer.component";

import { AuthService } from "../services/auth.service";
import { UserCrudService } from "../services/user-crud.service";
import { AuthGuardService } from "../services/auth-guard.service";
import { AnnoncesService } from "../services/annonces.service";
import { MessagesComponent } from "./examples/messages/messages.component";
import { UsersComponent } from "./examples/users/users.component";
import { AnnoncesCrudService } from "../services/annonces-crud.service";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    HeaderComponent,
    DashbordComponent,
    AnnonceListComponent,
    SingleAnnonceComponent,
    AnnonceFormComponent,
    FooterComponent,
    MessagesComponent,
    UsersComponent,
  ],
  exports: [
    IndexComponent,
    ProfilepageComponent,
    RegisterpageComponent,
    LandingpageComponent,
    HeaderComponent,
    // DashbordComponent,
    AnnonceListComponent,
    SingleAnnonceComponent,
    AnnonceFormComponent,
    FooterComponent,
    UsersComponent,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AnnoncesService,
    UserCrudService,
    AnnoncesCrudService,
  ],
})
export class PagesModule {}
