import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth : AuthService,private router:Router, private toastr: ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isLoggedIn()){
      return true;
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
