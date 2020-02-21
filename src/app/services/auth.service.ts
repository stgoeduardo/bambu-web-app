import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // constructor with angularfirestore, angularefireauth and router instances
    constructor(public angularFireStore: AngularFirestore,   // Inject Firestore service
        public anglarFireAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router) {
    }
    // service to make a request for create an user in firebase
    register(email: string, password: string) {
        return new Promise<any>( (resolve, reject) => {
            this.anglarFireAuth.auth.createUserWithEmailAndPassword(email, password)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
    // service to make a request for login an user in firebase
    login(email:string, password:string) {
        return new Promise<any>( (resolve, reject) => {
            this.anglarFireAuth.auth.signInWithEmailAndPassword(email, password)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
    // logout from firebase
    logout() {
        return new Promise<any>((resolve, reject) => {
            this.anglarFireAuth.auth.signOut()
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
    // verified if user exist in localStorage
    isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null);
    }

}