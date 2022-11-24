import { RegistrationService } from 'src/app/services/registration.service';
import { User } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private registrationService:RegistrationService, private router:Router) { }

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
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn');
    })
  }
}
