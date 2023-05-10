import { GraphData } from './../models/graph-data';
import { Orders } from './../models/orders';
import { User } from './../models/user';
import { CartItem } from './../models/cart-item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  order=new Orders()

  constructor(private http:HttpClient) { }

  addToOrderHistory(cart:CartItem[], user:User):Observable<Object>{
    return this.http.post<Object>("http://localhost:8080/myorders/"+user.id, this.order);
  }

  getOrderHistory(user:User):Observable<Orders[]>{
    return this.http.get<Orders[]>("http://localhost:8080/myorders/"+user.id);
  }

  getAllorders():Observable<Orders[]>{
    return this.http.get<Orders[]>("http://localhost:8080/myorders");
  }

  getOrdersCountOfMonthPerTear(year:number):Observable<GraphData[]>{
    return this.http.get<GraphData[]>("http://localhost:8080/myorders/graphData?year="+year);
  }
}
