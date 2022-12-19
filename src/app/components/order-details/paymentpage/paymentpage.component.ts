import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.css']
})
export class PaymentpageComponent implements OnInit {

  cartItems:CartItem[]=[];

  cartTotal=0
  user!:User

  constructor(private cartService:CartService, private orderSevice:OrderHistoryService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)
    this.loadCartItems();
    console.log(this.orderSevice.order)
  }

  loadCartItems(){
    this.cartService.getCartItems(this.user).subscribe((data)=>{
      this.cartItems=data;
      this.cartTotal=0

      this.orderSevice.order.products="";
      this.cartItems.forEach(c=>{
        this.orderSevice.order.products+=(c.productName+"  x  "+c.qty+"\r")
        this.cartTotal+= c.price*c.qty;
      })
      this.orderSevice.order.total=this.cartTotal;
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
