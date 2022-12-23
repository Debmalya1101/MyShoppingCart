import { OrderHistoryService } from './../../services/order-history.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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

  constructor(private orderService:OrderHistoryService, private toastr: ToastrService, private router:Router) { }

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
    this.orderService.order.email=this.orderDetailsForm.get('email')?.value;

    let q = confirm("Are you sure you want to place the order?\nClick 'OK' to continue.")
    if(q){
      this.router.navigate(['/buy']);
      this.toastr.warning('Please do not refresh the page', 'WARNING!',{
        timeOut:2000,
        closeButton: true,
        progressBar: true,
      });
    }
    else{
      this.router.navigate(['/shop']);
      this.toastr.info('Your order is not placed', '',{
        timeOut:2000,
        closeButton: true,
        progressBar: true,
      });
    }
    
  }

}
