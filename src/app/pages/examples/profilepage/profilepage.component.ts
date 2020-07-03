import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profilepage",
  templateUrl: "profilepage.component.html",
})
export class ProfilepageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }
}
