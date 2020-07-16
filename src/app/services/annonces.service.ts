import { Injectable } from "@angular/core";
import { Marchandise } from "../models/annonce.model";
import { Subject } from "rxjs";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class AnnoncesService {
  marchandises: Marchandise[] = [];
  marchandisesSubject = new Subject<Marchandise[]>();

  constructor() {
    // this.getMarchandises();
  }

  emitMarchandise() {
    this.marchandisesSubject.next(this.marchandises);
    // console.log("emit");
  }

  saveMarchandise() {
    firebase.database().ref("/annonces").set(this.marchandises);
  }

  getMarchandises() {
    firebase
      .database()
      .ref("/annonces/")
      .on("value", (data) => {
        this.marchandises = data.val() ? data.val() : [];
        this.emitMarchandise;
      });
    // console.log(this.marchandises);
  }

  getSingleMarchandise(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("/annonces/" + id)
        .once("value")
        .then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  createNewMarchandise(newMarchandise: Marchandise) {
    this.marchandises.push(newMarchandise);
    this.saveMarchandise();
    this.emitMarchandise();
  }

  // removeMarchandise(marchandises: Marchandise) {
  //   const MarchandiseIndexToRemove = this.marchandises.findIndex(
  //     (MarchandiseEL) => {
  //       if (MarchandiseEL === marchandises) {
  //         return true;
  //       }
  //     }
  //   );
  //   this.marchandises.splice(MarchandiseIndexToRemove, 1);
  //   this.saveMarchandise();
  //   this.emitMarchandise();
  // }
  removeMarchandise(marchandises: Marchandise) {
    console.log(marchandises);
    if (marchandises.photo) {
      const storageRef = firebase.storage().refFromURL(marchandises.photo);
      storageRef.delete().then(
        () => {
          console.log("Photo removed!");
        },
        (error) => {
          console.log("Could not remove photo! : " + error);
        }
      );
    }
    const marchandiseIndexToRemove = this.marchandises.findIndex(
      (marchandiseEl) => {
        if (marchandiseEl === marchandises) {
          return true;
        }
      }
    );
    this.marchandises.splice(marchandiseIndexToRemove, 1);
    this.saveMarchandise();
    this.emitMarchandise();
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
