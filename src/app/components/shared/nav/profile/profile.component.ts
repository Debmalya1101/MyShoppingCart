import { RegistrationService } from 'src/app/services/registration.service';
import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EncryptionservicService } from 'src/app/services/encryptionservic.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!:User
  cpass:boolean=false
  npass!:string
  ncpass!:string

  constructor(private registrationService:RegistrationService, 
              private router:Router, 
              private toastr: ToastrService, 
              private encryptionService: EncryptionservicService,
              public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    // this.user=JSON.parse(localStorage.getItem('user')!)
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    console.log(this.user)
  }

  onClickChangePassword(){
    this.cpass=true;
  }
  onClickSaveChanges(){
    this.user.password=this.encryptionService.encryptPassword(this.npass);
    console.log(this.user)
    this.registrationService.updateUserFromRemote(this.user).subscribe(data=>{
      this.router.navigate(['/login']);
      sessionStorage.clear()
      this.toastr.success('You can now use your new password to log in to your account', 'Successful password reset!',{
        timeOut:2000,
        closeButton: true,
        progressBar: true,
      });
    })
  }

  onClickLogout(){
    this.router.navigate(['/login']);
    sessionStorage.clear()
    this.toastr.success('You have successfully Logged out', 'Success!',{
      timeOut:2000,
      closeButton: true,
      progressBar: true,
    });
  }
}
