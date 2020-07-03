import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class UserCrudService {
  constructor(public fireservice: AngularFirestore) {}

  createNewUser(data) {
    return this.fireservice.collection("users").add(data);
  }

  updateUser(id, user) {
    this.fireservice.doc("users/" + id).update(user);
  }

  getAllUsers() {
    return this.fireservice.collection("users").snapshotChanges();
  }

  deleteUser(id) {
    this.fireservice.doc("users/" + id).delete();
  }
}
