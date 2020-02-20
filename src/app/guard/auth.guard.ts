import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*if(!this.authService.isLoggedIn) {
            // this.router.navigate(['/login']);
        }*/
        if(!this.authService.isLoggedIn()) {
            console.log("va a dirigir a login por que no hay user");
            this.router.navigate(['/login']);
        }
        /// this.authService.isLoggedIn();
        return true;
    }
}