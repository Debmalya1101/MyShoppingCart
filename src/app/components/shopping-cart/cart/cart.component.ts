import { User } from './../../../models/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { CartItem } from './../../../models/cart-item';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:CartItem[]=[];

  cartTotal=0
  user!:User

  constructor(private msg:MessengerService,
              private cartService:CartService,
              private regservice:RegistrationService
    
    ) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)
    this.handleSupscription();
    this.loadCartItems();
  }

  handleSupscription(){
    this.msg.getMsg().subscribe((product:any)=>{
      this.user=JSON.parse(localStorage.getItem('user')!)
      this.loadCartItems();
    })
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

}
