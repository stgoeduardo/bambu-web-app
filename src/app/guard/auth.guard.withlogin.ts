import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardWithlogin implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    
    // service that help my page to verify if exist or no active session.
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // if user exist redirect home
        if(this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }
        return true;
    }
}