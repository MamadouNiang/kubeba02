import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject,
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import * as firebase from "firebase";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    public location: Location,
    @Inject(DOCUMENT) document
  ) {var firebaseConfig = {
    apiKey: "AIzaSyDxq4jaNqAIEFelD8bV53Uj139lLWqlV9c",
    authDomain: "koubeba-cf9c4.firebaseapp.com",
    databaseURL: "https://koubeba-cf9c4.firebaseio.com",
    projectId: "koubeba-cf9c4",
    storageBucket: "koubeba-cf9c4.appspot.com",
    messagingSenderId: "994162397066",
    appId: "1:994162397066:web:232c0664caf604566cc273",
    measurementId: "G-T0DY5WEQW3",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics(); }
  
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }
  ngOnInit() {
    this.onWindowScroll(event);
  }
}
