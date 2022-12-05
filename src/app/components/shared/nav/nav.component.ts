import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user!:User

  constructor() { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)
    // console.log(this.user.userName)
  }

  loggedOutUser(){
    localStorage.removeItem('user')
    localStorage.removeItem('loggedIn')
    // console.log('removed')
  }

}
