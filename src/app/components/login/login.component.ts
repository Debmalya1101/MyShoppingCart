import { User } from './../../models/user';
import { RegistrationService } from './../../services/registration.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { EncryptionservicService } from 'src/app/services/encryptionservic.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg='';

  constructor(private service : RegistrationService, 
              private router:Router, 
              private toastr: ToastrService,
              private encryptionService: EncryptionservicService,
              public jwtHelper: JwtHelperService
              ) { }

  ngOnInit(): void {
  }

  loginUser(){
    this.user.password = this.encryptionService.encryptPassword(this.user.password)
    this.service.loginUserFromRemote(this.user).subscribe(
      data=>{
        this.toastr.success('Login Successful', 'Success!',{
          timeOut:2500,
          closeButton: true,
          progressBar: true,
        });
        this.msg=''
        sessionStorage.setItem('token',JSON.stringify(data))
        this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
        if(this.user.role==='ROLE_ADMIN'){
          this.router.navigate(['/admin']);
          console.log('admin');
        }
        else{
          console.log('user')
          this.router.navigate(['/shop']);
        }
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
