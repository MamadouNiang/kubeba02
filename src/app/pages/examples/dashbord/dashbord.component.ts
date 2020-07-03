import { Component, OnInit } from "@angular/core";
import { AnnoncesService } from "src/app/services/annonces.service";
import { Subscription } from "rxjs";
import { Marchandise } from "src/app/models/annonce.model";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashbord",
  templateUrl: "./dashbord.component.html",
  styleUrls: ["./dashbord.component.scss"],
})
export class DashbordComponent implements OnInit {
  marchandise: Marchandise[];
  marchandiseSubscription: Subscription;
  constructor(
    private annonceService: AnnoncesService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.marchandiseSubscription = this.annonceService.marchandisesSubject.subscribe(
      (marchandise: Marchandise[]) => {
        this.marchandise = marchandise;
      }
    );
    this.annonceService.getMarchandises();
    this.annonceService.emitMarchandise();
  }
}
