import { RegistrationService } from 'src/app/services/registration.service';
import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private registrationService:RegistrationService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)
  }

  onClickChangePassword(){
    this.cpass=true;
  }
  onClickSaveChanges(){
    this.user.password=this.npass;
    console.log(this.user)
    this.registrationService.updateUserFromRemote(this.user).subscribe(data=>{
      this.router.navigate(['/login']);
      localStorage.clear()
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
    localStorage.clear()
    sessionStorage.clear()
    this.toastr.success('You have successfully Logged out', 'Success!',{
      timeOut:2000,
      closeButton: true,
      progressBar: true,
    });
  }
}
