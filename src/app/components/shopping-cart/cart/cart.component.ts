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

  cartItems:any[]=[];

  cartTotal=0

  constructor(private msg:MessengerService,
              private cartService:CartService
    
    ) { }

  ngOnInit(): void {

    this.getCartItems();

    this.msg.getMsg().subscribe((product:any)=>{
      this.addProductToCart(product);
    })
  }

  getCartItems(){
    this.cartService.getCartItems().subscribe((data)=>{
      this.cartItems=data;

      this.cartItems.forEach(c=>{
        this.cartTotal+= c.price*c.qty;
      })
    })
  }

  addProductToCart(product: Product){

    let exists=false

    for(let i in this.cartItems){
          if(this.cartItems[i].productId===product.id){
            this.cartItems[i].qty++
            exists=true;
            break;
          }
        }

    if(!exists){
      this.cartItems.push({
            productId:product.id,
            productName:product.name,
            qty:1,
            price:product.price
          })
    }    

    this.cartTotal=0
    this.cartItems.forEach(item=>{
      this.cartTotal+= (item.qty*item.price)
    })
  }

}
