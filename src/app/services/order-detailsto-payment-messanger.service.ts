import { Orders } from './../models/orders';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailstoPaymentMessangerService {

  subject=new Subject()

  constructor() { }

  sendMsg(order:Orders){
    //console.log(product)
    this.subject.next(order)//Triggering an event
  }

  getMsg(){
    return this.subject.asObservable()
  }
}
