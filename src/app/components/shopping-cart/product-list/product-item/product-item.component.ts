import { ProductDetailsMessangerService } from './../../../../services/product-details-messanger.service';
import { User } from './../../../../models/user';
import { RegistrationService } from 'src/app/services/registration.service';
import { WishlistService } from './../../../../services/wishlist.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Product } from 'src/app/models/product';
import { MessengerService } from 'src/app/services/messenger.service';
import { CartService } from 'src/app/services/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

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

  @Output() buttonClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  u!:User

  constructor(private msg:MessengerService,
              private cartService:CartService,
              private wishlistService:WishlistService,
              private regservice:RegistrationService,
              private detailsService:ProductDetailsMessangerService,
              public jwtHelper: JwtHelperService,
              private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  handleAddtocart(){
    //console.log(this.productItem);
    // this.u=JSON.parse(localStorage.getItem('user')!)
    this.u = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.cartService.addProductToCart(this.productItem, this.u).subscribe(data=>{
      this.msg.sendMsg(this.productItem);
    });
    this.toastr.success('Item has been added to the Cart','',{
      timeOut:2500,
      positionClass: 'toast-bottom-center',
      closeButton: true,
      progressBar: true,
    })
  }

  handleAddToWishlist(event:MouseEvent){
    // this.u=JSON.parse(localStorage.getItem('user')!)
    this.u = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.wishlistService.addToWishlist(this.productItem,this.u).subscribe(()=>{
      this.addedToWishlist=true
      this.buttonClick.emit(event);
      this.msg.sendMsg(this.productItem);
    })
  }

  handleRemoveFromWishlist(event:MouseEvent){
    // this.u=JSON.parse(localStorage.getItem('user')!)
    this.u = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.wishlistService.removeFromWishList(this.productItem,this.u).subscribe(()=>{
      this.addedToWishlist=false
      this.buttonClick.emit(event);
      this.msg.sendMsg(this.productItem);
    })
  }

  handleViewDetails(){
    sessionStorage.setItem('product',JSON.stringify(this.productItem))
    this.detailsService.sendMsg(this.productItem);
  }

}
