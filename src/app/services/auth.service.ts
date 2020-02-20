import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public afs: AngularFirestore,   // Inject Firestore service
        public afAuth: AngularFireAuth, // Inject Firebase auth service
        public router: Router) {
            
        /*this.afAuth.authState.subscribe(user => {
            console.log("user ", user, "HEYYYYYYYYYY--------", localStorage.getItem('user'));
            if (user) {
                console.log("entro")
                // si hay datos desde firebase, que ya se inicio sesion o asi, entonces
                if (localStorage.getItem('user') == null) {
                    console.log("set item")
                    localStorage.setItem('user', JSON.stringify(user));    
                }
            }
        });*/
        
    }

    login(email:string, password:string) {
        return new Promise<any>( (resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(email, password)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    logout() {
        return new Promise<any>((resolve, reject) => {
            this.afAuth.auth.signOut()
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    isLoggedIn(): boolean {
        console.log("islogeedin")
        const user = JSON.parse(localStorage.getItem('user'));

        console.log("User ", user)//, user.emailVerified);

        //return true;
        return (user !== null);// && user.emailVerified);
    }

}