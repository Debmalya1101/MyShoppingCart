import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  cartItems:CartItem[]=[];

  cartTotal=0
  user!:User

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)
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

}
