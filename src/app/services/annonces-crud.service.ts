import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from "firebase";
import { Marchandise } from "../models/annonce.model";

@Injectable({
  providedIn: "root",
})
export class AnnoncesCrudService {
  photo: any;
  constructor(public fireservice: AngularFirestore) {}

  createNewAnnonce(data: any) {
    return this.fireservice.collection("annonces").add(data);
  }

  updateAnonce(id, annonce) {
    this.fireservice.doc("annonces/" + id).update(annonce);
  }

  getAllAnnonces() {
    return this.fireservice.collection("annonces").snapshotChanges();
  }

  deleteAnnonce(id, idp) {
    console.log(id, " ng", idp);
    if (idp) {
      const storageRef = firebase.storage().refFromURL(idp);
      storageRef.delete().then(
        () => {
          console.log("Photo removed!", id);
        },
        (error) => {
          console.log("Could not remove photo! : " + error);
        }
      );
    }
    this.fireservice.doc("annonces/" + id).delete();
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child("images/" + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log("Chargement…");
        },
        (error) => {
          console.log("Erreur de chargement ! : " + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    });
  }
}
