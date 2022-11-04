import { User } from 'src/app/models/user';
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

  getWishlist(user:User):Observable<Wishlist[]>{
    return this.http.get<Wishlist[]>("http://localhost:8080/wishlist/"+user.id);
  }

  addToWishlist(product:Product,user:User){
    return this.http.post("http://localhost:8080/wishlist/"+user.id,product);
  }

  removeFromWishList(product:Product,user:User){
    return this.http.delete("http://localhost:8080/wishlist/"+product.id+"/"+user.id);
  }
}
