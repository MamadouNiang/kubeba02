import { Component, OnInit } from "@angular/core";
import { AnnoncesCrudService } from "../../../services/annonces-crud.service";
import { Router } from "@angular/router";
import { UserCrudService } from "src/app/services/user-crud.service";

@Component({
  selector: "app-annonce-cards",
  templateUrl: "./annonce-cards.component.html",
  styleUrls: ["./annonce-cards.component.scss"],
})
export class AnnonceCardsComponent implements OnInit {
  annonce: any;
  user: any;
  constructor(
    private annoncecrudservice: AnnoncesCrudService,
    public userService: UserCrudService
  ) {}

  ngOnInit(): void {
    this.annoncecrudservice.getAllAnnonces().subscribe((data) => {
      this.annonce = data.map((e) => {
        return {
          id: e.payload.doc.id,
          photo: e.payload.doc.data()["photo"],
          description: e.payload.doc.data()["description"],
          username: e.payload.doc.data()["username"],
        };
      });
      console.log(this.annonce);
    });
  }
}
