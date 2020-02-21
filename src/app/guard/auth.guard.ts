import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    
    // service that help my page to verify if exist or no active session.
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // If user doesnt exist, redirect login...
        if(!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }
        return true;
    }
}