import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filter } from '../models/filter';

@Injectable({
  providedIn: 'root'
})
export class ResetpricefiltermessengerService {

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
