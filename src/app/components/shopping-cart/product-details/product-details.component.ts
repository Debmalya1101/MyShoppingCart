import { User } from './../../../models/user';
import { Product } from './../../../models/product';
import { ProductDetailsMessangerService } from './../../../services/product-details-messanger.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!:Product
  user!:User

  constructor(private toastr: ToastrService, private cartService:CartService, public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.product=JSON.parse(sessionStorage.getItem('product')!)
  }

  handleAddToCart(){
    // this.user=JSON.parse(localStorage.getItem('user')!)
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.cartService.addProductToCart(this.product,this.user).subscribe();
    this.toastr.success('Item has been added to the Cart','',{
      timeOut:2500,
      positionClass: 'toast-bottom-center',
      closeButton: true,
      progressBar: true,
    })
  }

  

}
