import { Component, OnInit } from "@angular/core";
import { Marchandise } from "src/app/models/annonce.model";
import { ActivatedRoute, Router } from "@angular/router";
import { AnnoncesService } from "src/app/services/annonces.service";

@Component({
  selector: "app-single-annonce",
  templateUrl: "./single-annonce.component.html",
  styleUrls: ["./single-annonce.component.scss"],
})
export class SingleAnnonceComponent implements OnInit {
  marchandise: Marchandise;

  constructor(
    private route: ActivatedRoute,
    private annoncesService: AnnoncesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.marchandise = new Marchandise("", "", "", "", "", "", "");
    const id = this.route.snapshot.params["id"];
    this.annoncesService
      .getSingleMarchandise(+id)
      .then((marchandise: Marchandise) => {
        this.marchandise = marchandise;
      });
  }

  onBack() {
    this.router.navigate(["/dashbord"]);
  }
}
