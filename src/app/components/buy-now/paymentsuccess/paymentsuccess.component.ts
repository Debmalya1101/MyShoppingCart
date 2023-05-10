import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paymentsuccess',
  templateUrl: './paymentsuccess.component.html',
  styleUrls: ['./paymentsuccess.component.css']
})
export class PaymentsuccessComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  afterClick(){
    this.toastr.info('Go to My Orders to track orders','Order Placed!',{
      timeOut:3000,
      positionClass: 'toast-bottom-center',
      closeButton: true,
      progressBar: true,
    })
  }

}
