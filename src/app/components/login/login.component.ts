import { User } from './../../models/user';
import { RegistrationService } from './../../services/registration.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg='';

  constructor(private service : RegistrationService, private router:Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.service.loginUserFromRemote(this.user).subscribe(
      data=>{
        console.log("response received");
        this.msg=''
        this.router.navigate(['/shop']);
      },
      error=>{
        console.log("exception occured");
        this.msg='Bad Credentials! Please enter correct EmailId & Password';
      }
    )
  }

}
