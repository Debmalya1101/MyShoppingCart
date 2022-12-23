import { User } from './../../models/user';
import { RegistrationService } from './../../services/registration.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg='';

  constructor(private service : RegistrationService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.service.loginUserFromRemote(this.user).subscribe(
      data=>{
        this.toastr.success('Login Successful', 'Success!',{
          timeOut:2500,
          closeButton: true,
          progressBar: true,
        });
        this.msg=''
        this.router.navigate(['/shop']);
        this.service.loggedInUser=data;
        localStorage.setItem('user',JSON.stringify(data))
        localStorage.setItem('loggedIn','true')
      },
      error=>{
        // console.log("exception occured");
        this.toastr.error('Invalid Credentials', 'ERROR!',{
          timeOut:5000,
          closeButton: true,
          progressBar: true,
        });
        this.msg='Invalid Credentials! Please enter correct EmailId & Password';
      }
    )
  }

}
