import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user!:User

  constructor(private router:Router, private toastr: ToastrService, public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    // this.user=JSON.parse(localStorage.getItem('user')!)
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
  }

  loggedOutUser(){
    // localStorage.clear()
    sessionStorage.clear()
    this.toastr.success('You have successfully Logged out', 'Success!',{
      timeOut:2000,
      closeButton: true,
      progressBar: true,
    });
  }

}
