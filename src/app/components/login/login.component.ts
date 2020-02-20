import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(email: string, password: string) {

    console.log(email.length, password.length);
    if (email.length > 0 && password.length > 0) {
      
      this.authService.login(email, password)
        .then(res => {
          console.log("res => ", res);
          this.router.navigate(['/home']);
        })
        .catch(err => {
          console.log("error ", err);
        });

    } else {
      console.log("Es necesario ingresar los datos!");
    }

  }

}
