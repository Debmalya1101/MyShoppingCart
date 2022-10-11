import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  msg='';

  constructor(private service:RegistrationService,
              private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.service.registerUserFromRemote(this.user).subscribe(
      data=>{
        console.log('response received');
        this.msg='Registration Successful';
        // this.router.navigate(['/login']);
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },1000)
      },
      error=>{
        //this.msg=error.error;
        this.msg='user already exists';
      }
    )
  }

}
