import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // variables
  message: string = "";
  isError: boolean = false;
  isRegisterUser: boolean = false;
  isOkRegister: boolean = false;
  
  // constructor with authservice and router instances
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {}
  // login with email and password
  login(email: any, password: any) {
    this.message = "";
    this.isError = false;
    this.isOkRegister = false;
    this.isRegisterUser = false;
    // console.log(email.value.length, password.value.length);
    if (email.value.length > 0 && password.value.length > 0) {
      this.authService.login(email.value, password.value)
        .then(res => {
          // console.log("res => ", res);
          if (localStorage.getItem('user') == null) {
            console.log("set item")
            localStorage.setItem('user', JSON.stringify(res));
          }
          this.router.navigate(['/home']);
        })
        .catch(err => {
          this.isError = true;
          if(err.code === 'auth/user-not-found') {
            this.isRegisterUser = true;
            this.message = "No existe el registro de este usuario, ";
          } else if(err.code === 'auth/wrong-password') {
            this.message = "Contraseña incorrecta.";
          } else {
            this.message = err.message;
          }
          // console.log("error ", err);
        });

    } else {
      // console.log("Es necesario ingresar los datos!");
      this.isError = true;
      this.message = "Es necesario rellenar los dos campos!";
    }
  }
  // register an user with email and password
  register(email: any, password: any) {
    this.message = "";
    this.isError = false;
    this.isRegisterUser = false;
    this.authService.register(email.value, password.value)
      .then(res => {
        // email.value = "";
        password.value = "";
        this.isOkRegister = true;
        this.message = "Usuario registrado, Inicie sesion.";
      })
      .catch(err => {
        console.log("err ", err);
      })
  }
}
