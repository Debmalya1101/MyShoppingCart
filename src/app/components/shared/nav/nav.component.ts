import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user!:User

  constructor(private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)
    // console.log(this.user.userName)
  }

  loggedOutUser(){
    // this.router.navigate(['/login'], { replaceUrl: true });
    localStorage.removeItem('user')
    localStorage.removeItem('loggedIn')
    this.toastr.success('You have successfully Logged out', 'Success!',{
      timeOut:2000,
      closeButton: true,
      progressBar: true,
    });
    // console.log('removed')
  }

}
