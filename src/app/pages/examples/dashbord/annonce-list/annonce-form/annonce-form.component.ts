import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AnnoncesService } from "src/app/services/annonces.service";
import { Router } from "@angular/router";
import { Marchandise } from "src/app/models/annonce.model";

@Component({
  selector: "app-annonce-form",
  templateUrl: "./annonce-form.component.html",
  styleUrls: ["./annonce-form.component.scss"],
})
export class AnnonceFormComponent implements OnInit {
  marchandiseForm: FormGroup;
  focus;
  focus1;
  focus2;

  constructor(
    private fb: FormBuilder,
    private annoncesService: AnnoncesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.marchandiseForm = this.fb.group({
      photo: ["", Validators.required],
      description: ["", Validators.required],
      typologie: ["", Validators.required],
      poids: ["", Validators.required],
      dateExp: ["", Validators.required],
      dateLiv: ["", Validators.required],
      dateCreation: ["", Validators.required],
    });
  }

  onSaveMarchandise() {
    const photo = this.marchandiseForm.get("photo").value;
    const description = this.marchandiseForm.get("description").value;
    const typologie = this.marchandiseForm.get("typologie").value;
    const poids = this.marchandiseForm.get("poids").value;
    const dateExp = this.marchandiseForm.get("dateExp").value;
    const dateLiv = this.marchandiseForm.get("dateLiv").value;
    const dateCreation = this.marchandiseForm.get("dateCreation").value;
    const newMarchandise = new Marchandise(
      photo,
      description,
      typologie,
      poids,
      dateExp,
      dateLiv,
      dateCreation
    );
    this.annoncesService.createNewMarchandise(newMarchandise);
    this.router.navigate(["/dashbord"]);
  }
}
