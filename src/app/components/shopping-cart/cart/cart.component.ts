import { Wishlist } from './../../../models/wishlist';
import { WishlistService } from './../../../services/wishlist.service';
import { User } from './../../../models/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { CartItem } from './../../../models/cart-item';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems:CartItem[]=[];
  wishlist:Wishlist[]=[];

  cartTotal=0
  user!:User

  constructor(private msg:MessengerService,
              private cartService:CartService,
              private regservice:RegistrationService,
              private wishlistService:WishlistService,
              public jwtHelper: JwtHelperService
    
    ) { }

  ngOnInit(): void {
    // this.user=JSON.parse(localStorage.getItem('user')!)
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.handleSupscription();
    this.loadCartItems();
    this.loadWishList();
  }

  handleSupscription(){
    this.msg.getMsg().subscribe((product:any)=>{
      // this.user=JSON.parse(localStorage.getItem('user')!)
      this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
      this.loadCartItems();
      this.loadWishList();
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

  loadWishList(){
    // this.user=JSON.parse(localStorage.getItem('user')!)
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.wishlistService.getWishlist(this.user).subscribe(data=>{
      this.wishlist=data;
      // console.log(this.wishlist);
    })
  }

}
