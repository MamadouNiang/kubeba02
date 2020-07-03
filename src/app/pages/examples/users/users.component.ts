import { Component, OnInit } from "@angular/core";
import { UserCrudService } from "../../../services/user-crud.service";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { User } from "firebase";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  user: any;
  nom_renom: string;
  email: string;
  userType: string;
  userAccount: string;
  contrat: boolean;
  telephone: number;
  password: string;
  errormessage: any;
  error: { name: string; message: string } = { name: "", message: "" };

  constructor(
    public userService: UserCrudService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.user = data.map((e) => {
        return {
          isedit: false,
          id: e.payload.doc.id,
          nom_prenom: e.payload.doc.data()["nom_prenom"],
          email: e.payload.doc.data()["email"],
          userType: e.payload.doc.data()["userType"],
          userAccount: e.payload.doc.data()["userAccount"],
          contrat: e.payload.doc.data()["contrat"],
          telephone: e.payload.doc.data()["telephone"],
          password: e.payload.doc.data()["password"],
        };
      });
      // console.log(this.user);
    });
  }
  editUser(user) {
    user.isedit = true;
    user.editnom_prenom = user.nom_prenom;
    user.editemail = user.email;
    user.edituserType = user.userType;
    user.edituserAccount = user.userAccount;
    user.editcontrat = user.contrat;
    user.edittelephone = user.telephone;
    user.editpassword = user.password;
  }
  modifierUser(user) {
    let data = {};
    data["nom_prenom"] = user.editnom_prenom;
    data["email"] = user.editemail;
    data["userType"] = user.edituserType;
    data["userAccount"] = user.edituserAccount;
    data["contrat"] = user.editcontrat;
    data["telephone"] = user.edittelephone;
    data["password"] = user.editpassword;

    this.userService.updateUser(user.id, data);
    user.isedit = false;
  }
  supprimer(id) {
    this.userService.deleteUser(id);
  }
  viewUser(item) {}
}
