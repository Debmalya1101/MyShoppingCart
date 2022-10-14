import { User } from './../../../../models/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { WishlistService } from './../../../../services/wishlist.service';
import { Component, OnInit, Input } from '@angular/core';

import { Product } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input()
  productItem!: Product;
  @Input()
  addedToWishlist!: boolean;

  u!:User

  constructor(private msg:MessengerService,
              private cartService:CartService,
              private wishlistService:WishlistService,
              private regservice:RegistrationService
    ) { }

  ngOnInit(): void {
  }

  handleAddtocart(){
    //console.log(this.productItem);
    console.log(JSON.parse(localStorage.getItem('user')!))
    this.u=JSON.parse(localStorage.getItem('user')!)
    this.cartService.addProductToCart(this.productItem, this.u).subscribe(data=>{
      this.msg.sendMsg(this.productItem);
    });
    console.log(this.regservice.loggedInUser)
  }

  handleAddToWishlist(){
    this.wishlistService.addToWishlist(this.productItem).subscribe(()=>{
      this.addedToWishlist=true
    })
  }

  handleRemoveFromWishlist(){
    this.wishlistService.removeFromWishList(this.productItem).subscribe(()=>{
      this.addedToWishlist=false
    })
  }

}
