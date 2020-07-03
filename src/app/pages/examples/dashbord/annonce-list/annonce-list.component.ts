import { Component, OnInit, OnDestroy } from "@angular/core";
import { Marchandise } from "src/app/models/annonce.model";
import { Subscription } from "rxjs";
import { AnnoncesService } from "src/app/services/annonces.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AnnoncesCrudService } from "../../../../services/annonces-crud.service";

@Component({
  selector: "app-annonce-list",
  templateUrl: "./annonce-list.component.html",
  // styleUrls: ["./annonce-list.component.scss"],
})
export class AnnonceListComponent implements OnInit, OnDestroy {
  annonce: any;
  photo: any;
  poids: number;
  description: string;
  typologie: any;
  dateLiv: any;
  dateExp: any;
  dateExpedition;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  marchandiseForm: FormGroup;
  marchandises: Marchandise[];
  marchandiseSubscription: Subscription;
  minDateExp: Date;
  minDateLiv: Date;
  autreClick: boolean;
  datime: any;
  errormessage: any;
  constructor(
    private annonceService: AnnoncesService,
    private router: Router,
    private fb: FormBuilder,
    private annoncecrudservice: AnnoncesCrudService
  ) {
    const D = new Date().getDate();
    const M = new Date().getMonth();
    const Y = new Date().getFullYear();
    const H = new Date().getHours();
    const m = new Date().getMinutes();
    const s = new Date().getSeconds();
    this.datime = Y + "-" + M + "-" + D + "  " + H + " :" + m + " :" + s;
    this.minDateExp = new Date();
    this.minDateLiv = this.minDateExp;
    this.autreClick = false;
    this.minDateExp.setDate(this.minDateExp.getDate());
    this.minDateLiv.setDate(this.minDateExp.getDate() + 1);
  }
  ngOnInit() {
    this.annoncecrudservice.getAllAnnonces().subscribe((data) => {
      this.annonce = data.map((e) => {
        return {
          isedit: false,
          id: e.payload.doc.id,
          photo: e.payload.doc.data()["photo"],
          description: e.payload.doc.data()["description"],
          poids: e.payload.doc.data()["poids"],
          dateLiv: e.payload.doc.data()["dateLiv"],
          dateExp: e.payload.doc.data()["dateExp"],
          dateCreation: e.payload.doc.data()["dateCreation"],
          typologie: e.payload.doc.data()["typologie"],
        };
      });
      // console.log(this.annonce);
    });
    this.marchandiseSubscription = this.annonceService.marchandisesSubject.subscribe(
      (marchandisess: Marchandise[]) => {
        this.marchandises = marchandisess;
      }
    );
    this.annonceService.getMarchandises();
    this.annonceService.emitMarchandise();
    this.initForm();
  }

  autres() {
    // console.log("click");
    this.autreClick = !this.autreClick;
  }
  options() {
    this.autreClick = false;
  }
  change() {
    this.dateExpedition = this.marchandiseForm.get("dateExp").value;
    // console.log(this.dateExpedition);
    this.minDateLiv = this.dateExpedition;
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.annoncecrudservice.uploadFile(file).then((url: string) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    });
  }

  initForm() {
    this.marchandiseForm = this.fb.group({
      photo: ["", Validators.required],
      typologie: ["", Validators.required],
      dateExp: ["", Validators.required],
      dateLiv: ["", Validators.required],
      poids: ["", Validators.required],
      description: ["", Validators.required],
      dateCreation: [
        { value: this.datime, disabled: true },
        Validators.required,
      ],
    });
  }
  reset() {
    this.marchandiseForm.reset({
      photo: "",
      description: "",
      typologie: "",
      poids: "",
      dateExp: "",
      dateLiv: "",
    });
  }

  onSaveMarchandise() {
    let description = this.marchandiseForm.get("description").value;
    let typologie = this.marchandiseForm.get("typologie").value;
    let poids = this.marchandiseForm.get("poids").value;
    let dateExp = this.marchandiseForm.get("dateExp").value;
    let dateLiv = this.marchandiseForm.get("dateLiv").value;
    let photo = this.marchandiseForm.get("photo").value;
    let dateCreation = this.marchandiseForm.get("dateCreation").value;
    let newMarchandise = new Marchandise(
      photo,
      description,
      typologie,
      poids,
      dateExp,
      dateLiv,
      dateCreation
    );
    let data = {
      photo,
      description,
      typologie,
      poids,
      dateExp,
      dateLiv,
      dateCreation,
    };
    if (this.fileUrl && this.fileUrl !== "") {
      newMarchandise.photo = this.fileUrl;
    }
    if (this.fileUrl && this.fileUrl !== "") {
      data.photo = this.fileUrl;
    }
    this.annonceService.createNewMarchandise(newMarchandise);
    this.annoncecrudservice
      .createNewAnnonce(data)
      .then((res) => {
        // this.router.navigate(["dashbord"]);
      })
      .catch((error) => {
        this.errormessage = error;
      });
    this.marchandiseForm.reset();
    this.router.navigate(["/dashbord"]);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onNewMarchandise() {
    this.router.navigate(["annonces", "new"]);
  }

  onDeleteMarchandise(id: any, idp: any) {
    // console.log("id", id);
    // console.log("idp", id);
    this.annoncecrudservice.deleteAnnonce(id, idp);
    // this.annonceService.removeMarchandise(marchandise);
  }
  onDeleteMarchandisee(marchandise: Marchandise) {
    this.annonceService.removeMarchandise(marchandise);
  }

  onViewMarchandise(id: number) {
    this.router.navigate(["/annonces", "view", id]);
  }

  ngOnDestroy() {
    this.marchandiseSubscription.unsubscribe();
  }
}
