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
        // this.service.loggedInUser=data;
        // localStorage.setItem('user',JSON.stringify(data))
        // localStorage.setItem('loggedIn','true')
        sessionStorage.setItem('token',JSON.stringify(data))
      },
      error=>{
        // console.log("exception occured");
        console.log(error.message)
        let resetForm:HTMLFormElement;
        resetForm= <HTMLFormElement>document.getElementById('lform');
        resetForm.reset()
        setTimeout(() => {
          this.msg=''
        }, 2000);
        this.toastr.error('Invalid Credentials', 'ERROR!',{
          timeOut:2000,
          closeButton: true,
          progressBar: true,
        });
        this.msg='Invalid Credentials! Please enter correct EmailId & Password';
      }
    )
  }

}
