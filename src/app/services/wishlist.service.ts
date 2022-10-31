import { Wishlist } from './../models/wishlist';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  getWishlist():Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>("http://localhost:8080/wishlist")
  }

  addToWishlist(product:Product){
    return this.http.post("http://localhost:8080/wishlist",product);
  }

  removeFromWishList(product:Product){
    return this.http.delete("http://localhost:8080/wishlist/"+product.id)
  }
}
