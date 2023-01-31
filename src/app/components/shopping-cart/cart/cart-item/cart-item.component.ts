import { MessengerService } from './../../../../services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from './../../../../models/product';
import { User } from './../../../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input()
  cartItem:any

  u!:User
  p!:Product


  constructor(private cartservice:CartService, private mes:MessengerService, public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
  }

  deleteCart(){
    // this.u=JSON.parse(localStorage.getItem('user')!)
    this.u = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.cartservice.removeProductFromCart(this.cartItem,this.u).subscribe(data=>{
      this.mes.sendMsg(this.p)
    })
  }

}
