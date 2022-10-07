import { Product } from './../models/product';
import { CartItem } from './../models/cart-item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems:CartItem[]=[]

  constructor(private http:HttpClient) { }

  getCartItems():Observable<CartItem[]>{
    //mapping the obtained result to CartItems pros.
    // let resp= this.http.get<CartItem[]>("http://localhost:8080/cartitems")
    // resp.subscribe(cart => cart.forEach(p => this.cartItems.push(p)));
    // return this.cartItems
    return this.http.get<CartItem[]>("http://localhost:8080/cartitems")
  }

  addProductToCart(product:Product):Observable<Object>{
    //console.log(product)
    return this.http.post<Object>("http://localhost:8080/cart",product);

  }
}
