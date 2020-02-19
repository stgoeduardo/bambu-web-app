import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
/* https://www.positronx.io/full-angular-7-firebase-authentication-system/ 
https://blog.webf.zone/front-end-javascript-interviews-in-2018-19-e17b0b10514*/
// Firebase services + environment
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

// Auth service
import { AuthService } from "./services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // firebase services
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
/**
 * Refactor the routing configuration into a routing moduleCreate an AppRouting module in the /app folder to contain the routing configuration:
 * ng generate module app-routing --module app --flat
 * https://angular.io/guide/router
 */