import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import * as L from "leaflet";
import { Router } from "@angular/router";
@Component({
  selector: "app-index",
  templateUrl: "index.component.html",
})
export class IndexComponent implements OnInit, OnDestroy {
  register = this.fb.group({
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
      ],
    ],
    password: [
      "",
      [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)],
    ],
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.register.value);
    const email = this.register.get("email").value;
    const password = this.register.get("password").value;
  }
  get email() {
    return this.register.get("email");
  }
  get password() {
    return this.register.get("password");
  }
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  errormessage: string;
  constructor(private fb: FormBuilder, private router: Router) {}
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var mymap = L.map("mapid").setView([14.7394, -17.4157], 12);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "sk.eyJ1IjoibWFtYWRvdW5pYW5nIiwiYSI6ImNrYWdkYW96MjA1ajkycnQ5OGxuMGg5OGoifQ.5g8Xp3QRLcewewNKxXvm8g",
      }
    ).addTo(mymap);
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");

    var slider = document.getElementById("sliderRegular");

    // noUiSlider.create(slider, {
    //   start: 40,
    //   connect: false,
    //   range: {
    //     min: 0,
    //     max: 100,
    //   },
    // });

    var slider2 = document.getElementById("sliderDouble");

    //   noUiSlider.create(slider2, {
    //     start: [20, 60],
    //     connect: true,
    //     range: {
    //       min: 0,
    //       max: 100,
    //     },
    //   });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
