import { User } from 'src/app/models/user';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!:User;

  constructor(public jwtHelper: JwtHelperService) { }

  isLoggedIn(){
    // let token = "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzM5NDYzMTIsImlkIjoxLCJlbWFpbElkIjoiYWJjZEBnbWFpbC5jb20iLCJ1c2VyTmFtZSI6IkFiY2QxMjMiLCJleHAiOjE2NzM5NDY2MTJ9.fyv9SRcfzJ8_UAH9scv9tYvMfNIgYW-FYTj0onJk1OY";
    // console.log(this.jwtHelper.isTokenExpired(token));
    // console.log(this.jwtHelper.decodeToken(token));
    // this.user = this.jwtHelper.decodeToken(token)!
    // console.log(this.user)
    // return !!localStorage.getItem('loggedIn');
    let token= JSON.parse(sessionStorage.getItem('token')!)
    return !!sessionStorage.getItem('token')&&!this.jwtHelper.isTokenExpired(token);
  }
}
