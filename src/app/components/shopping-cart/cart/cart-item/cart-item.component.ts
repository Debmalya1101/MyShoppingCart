import { MessengerService } from './../../../../services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from './../../../../models/product';
import { User } from './../../../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

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


  constructor(private cartservice:CartService, private mes:MessengerService, public jwtHelper: JwtHelperService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  deleteCart(){
    // this.u=JSON.parse(localStorage.getItem('user')!)
    this.u = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.cartservice.removeProductFromCart(this.cartItem,this.u).subscribe(data=>{
      this.mes.sendMsg(this.p)
      this.toastr.warning('', 'Item has been removed from Cart',{
        timeOut:2500,
        closeButton: true,
        progressBar: true,
      });
    })
  }

  decreaseQuantity(){
    if(this.cartItem.qty==1){
      this.deleteCart()
    }
    else{
      this.cartservice.decreaseQuantityCart(this.cartItem.id).subscribe(data=>{
        this.mes.sendMsg(this.p)
      })
    }
  }

  increaseQuantity(){
    this.cartservice.increaseQuantityCart(this.cartItem.id).subscribe(data=>{
      this.mes.sendMsg(this.p)
    })
  }

}
