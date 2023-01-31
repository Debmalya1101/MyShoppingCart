import { OrderHistoryService } from './../../services/order-history.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  cartItems:CartItem[]=[];

  cartTotal=0
  user!:User

  constructor(private cartService:CartService, private orderSevice:OrderHistoryService, public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    // this.user=JSON.parse(localStorage.getItem('user')!)
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.loadCartItems();
  }

  loadCartItems(){
    this.cartService.getCartItems(this.user).subscribe((data)=>{
      this.cartItems=data;
      this.cartTotal=0

      this.cartItems.forEach(c=>{
        this.cartTotal+= c.price*c.qty;
      })
    })
  }

  updateOrderHistory(){
    console.log(this.cartItems)
    this.orderSevice.addToOrderHistory(this.cartItems,this.user).subscribe(data=>{
      // console.log(data)
    })
    this.cartService.removeAllProductFromCart(this.user).subscribe(data=>{
      // console.log("remove from cart")
    })
  }

}
