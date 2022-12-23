import { User } from './../../../../models/user';
import { Orders } from './../../../../models/orders';
import { OrderHistoryService } from './../../../../services/order-history.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders!:Orders[]
  user!:User

  p: number = 1;

  constructor(private orderService:OrderHistoryService) { }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem('user')!)
    this.loadOrderHistory();
  }

  loadOrderHistory(){
    this.orderService.getOrderHistory(this.user).subscribe(data=>{
      this.orders=data.reverse();
    })
  }

}
