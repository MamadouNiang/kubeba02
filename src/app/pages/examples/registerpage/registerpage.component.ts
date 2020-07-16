import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { UserCrudService } from "../../../services/user-crud.service";

@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html",
})
export class RegisterpageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    public userService: UserCrudService
  ) {}

  // email = "";
  // password = "";
  errormessage: any;
  error: { name: string; message: string } = { name: "", message: "" };

  // registerr() {
  //   if (this.validateForm(this.email, this.password)) {
  //     this.authService
  //       .registerWithEmail(this.email, this.password)
  //       .then(() => {
  //         this.router.navigate["/profile"];
  //       })
  //       .catch((_error) => {
  //         this.error = _error;
  //         this.router.navigate["register"];
  //       });
  //   }
  // }

  // validateForm(email, password) {
  //   if (email.length === 0) {
  //     this.errormessage = "Veillez entrer un mail";
  //     return false;
  //   }
  //   if (password.length === 0) {
  //     this.errormessage = "Veillez entrer un password";
  //     return false;
  //   }
  //   if (password.length < 8) {
  //     this.errormessage = "Veillez entrer un password plus grand";
  //     return false;
  //   }
  //   this.errormessage = "";
  //   return true;
  // }

  register = this.fb.group({
    nom_prenom: ["", Validators.required],
    email: [
      "",
      [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
      ],
    ],
    password: ["", [Validators.required, Validators.minLength(8)]],
    telephone: ["", Validators.required],
    userType: ["", Validators.required],
    contrat: ["", Validators.required],
  });

  get nom_prenom() {
    return this.register.get("nom_prenom");
  }
  get email() {
    return this.register.get("email");
  }
  get password() {
    return this.register.get("password");
  }
  get userType() {
    return this.register.get("userType");
  }
  get userAccount() {
    return this.register.get("userAccount");
  }
  get telephone() {
    return this.register.get("telephone");
  }
  get contart() {
    return this.register.get("contrat");
  }
  reset() {
    this.register.reset({
      nom_prenom: "",
      email: "",
      password: "",
      telephone: "",
      contrat: false,
      userType: "",
    });
    console.log(this.register.value);
  }

  isCollapsed = true;
  focus;
  focustel;
  focus1;
  focus2;
  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");
    // var squares9 = document.getElementById("square9");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    // squares9.style.transform =
    //   "perspective(500px) rotateY(" +
    //   posX * 0.05 +
    //   "deg) rotateX(" +
    //   posY * -0.05 +
    //   "deg)";
    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
  onSubmit() {
    console.log("ici");
    // // TODO: Use EventEmitter with form value
    const email = this.register.get("email").value;
    const password = this.register.get("password").value;
    const nom_prenom = this.register.get("nom_prenom").value;
    const contrat = this.register.get("contrat").value;
    const userType = this.register.get("userType").value;
    const telephone = this.register.get("telephone").value;
    let userAccount;
    if (userType == "Employé") {
      userAccount = "false";
    } else {
      userAccount = "true";
    }
    console.log(
      email,
      password,
      nom_prenom,
      contrat,
      userType,
      telephone,
      userAccount
    );
    let data = {
      email,
      password,
      nom_prenom,
      contrat,
      userType,
      telephone,
      userAccount,
    };
    this.authService.createNewUser(email, password).then(
      () => {
        this.userService
          .createNewUser(data)
          .then((res) => {
            this.router.navigate(["dashbord"]);
          })
          .catch((error) => {
            this.errormessage = error;
          });
      },
      (error) => {
        this.errormessage = error;
      }
    );
  }
}
