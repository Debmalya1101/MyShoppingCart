import { Product } from './../models/product';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsMessangerService {

  public subject = new BehaviorSubject<Product>(new Product());

  constructor() { }

  sendMsg(product:Product){
    //console.log(product)
    this.subject.next(product)//Triggering an event
  }

  getMsg(){
    console.log('got')
    return this.subject.asObservable()
  }
}
