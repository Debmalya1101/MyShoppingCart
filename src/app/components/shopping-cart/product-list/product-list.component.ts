import { User } from 'src/app/models/user';
import { WishlistService } from './../../../services/wishlist.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList:Product[]=[]
  wishlist:number[]=[]
  user!:User

  constructor(private productService:ProductService,
              private wishlistService:WishlistService
    ) { }

  ngOnInit(): void {
    // this.productList=this.productService.getProducts()
    // console.log(this.productList.length)
    this.getProducts()
    this.loadWishlist()
  }

  getProducts(){

    this.productService.getProducts().subscribe((data)=>{

        this.productList=data;
        // console.log(this.productList);

      });
    }

    loadWishlist(){
      this.user=JSON.parse(localStorage.getItem('user')!)
      this.wishlistService.getWishlist(this.user).subscribe(data=>{
        data.forEach((w:any)=>this.wishlist.push(w.productId));
        //console.log(this.wishlist)
      })
    }

}
