import { User } from 'src/app/models/user';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user!:User;

  constructor(private auth : AuthService,private router:Router, private toastr: ToastrService, public jwtHelper: JwtHelperService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isLoggedIn()){
      // console.log(route.data['roles'].includes('ROLE_ADMIN'));
      // console.log(state.url)
      this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
      // console.log(this.user.role)
      if(route.data['roles'].includes(this.user.role))
        return true;
      else
        return false;
    }
    this.toastr.error('Please log in and try again', 'You are not logged in',{
      timeOut:2500,
      closeButton: true,
      progressBar: true,
    });
    this.router.navigate(['/login']);
    return false;
  }
  
}
