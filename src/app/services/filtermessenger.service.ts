import { Filter } from './../models/filter';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltermessengerService {

  subject=new Subject()

  constructor() { }

  sendMsg(filter:Filter){
    //console.log(product)
    this.subject.next(filter)//Triggering an event
  }

  getMsg(){
    return this.subject.asObservable()
  }
}
