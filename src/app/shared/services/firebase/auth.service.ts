import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { observable } from 'rxjs';
// import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { EmailValidator } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { HttpClient } from '@angular/common/http';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  public userData: any;
  public user: firebase.User;
  public showLoader: boolean = false;

  url = 'https://raasleela-api.mycodelibraries.com/api';



  constructor(
    private httpClient: HttpClient,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService) {

    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     cookieService.set('user', JSON.stringify(this.userData));
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // });
  }

  ngOnInit(): void { }

  
  SignIn(email: string, password: string) {
    return this.httpClient.post(`${environment.api}/account/login`, {
      username: email,
      password: password
    });
  }

  isLoggedIn() {
    return localStorage.getItem('user');
  }

  getToken():string{
    return localStorage.getItem('user')
  }
  
  

  

}