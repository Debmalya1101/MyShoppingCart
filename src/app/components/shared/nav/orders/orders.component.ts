import { User } from './../../../../models/user';
import { Orders } from './../../../../models/orders';
import { OrderHistoryService } from './../../../../services/order-history.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders!:Orders[]
  testorder!:Orders[]
  user!:User

  p: number = 1;

  constructor(private orderService:OrderHistoryService, public jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    // this.user=JSON.parse(localStorage.getItem('user')!)
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.loadOrderHistory();
  }

  loadOrderHistory(){
    this.orderService.getOrderHistory(this.user).subscribe(data=>{
      this.orders=data.reverse();
    })
  }

}
