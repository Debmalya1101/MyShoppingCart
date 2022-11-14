import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  isloggedIn!:string

  constructor() { }

  ngOnInit(): void {
    this.isloggedIn=localStorage.getItem('loggedIn')!
  }

}
