import { OrderHistoryService } from './../../services/order-history.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  

  orderDetailsForm = new FormGroup({
    fname:new FormControl('',[Validators.required, Validators.minLength(4)]),
    lname:new FormControl('',[Validators.required, Validators.minLength(4)]),
    email:new FormControl('',[Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}')]),
    phoneno:new FormControl('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    address:new FormControl('',[Validators.required])
  })

  constructor(private orderService:OrderHistoryService) { }

  ngOnInit(): void {
  }

  
  get fname(){
    return this.orderDetailsForm.get('fname');
  }

  get lname(){
    return this.orderDetailsForm.get('lname');
  }
  
  get email(){
    return this.orderDetailsForm.get('email');
  }

  get phoneno(){
    return this.orderDetailsForm.get('phoneno');
  }

  get address(){
    return this.orderDetailsForm.get('address');
  }

  afterContinue(){
    this.orderService.order.name = this.orderDetailsForm.get('fname')?.value +" "+ this.orderDetailsForm.get('lname')?.value;
    this.orderService.order.phoneNo= this.orderDetailsForm.get('phoneno')?.value;
    this.orderService.order.address=this.orderDetailsForm.get('address')?.value;
    console.log("Okay")
  }

}
