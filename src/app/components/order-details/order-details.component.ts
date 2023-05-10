import { OrderHistoryService } from './../../services/order-history.service';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderDetailsForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    lname: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-zA-Z]{2,4}'),
    ]),
    phoneno: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
    address: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private orderService: OrderHistoryService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get fname() {
    return this.orderDetailsForm.get('fname');
  }

  get lname() {
    return this.orderDetailsForm.get('lname');
  }

  get email() {
    return this.orderDetailsForm.get('email');
  }

  get phoneno() {
    return this.orderDetailsForm.get('phoneno');
  }

  get address() {
    return this.orderDetailsForm.get('address');
  }

  afterContinue() {
    this.orderService.order.name =
      this.orderDetailsForm.get('fname')?.value +
      ' ' +
      this.orderDetailsForm.get('lname')?.value;
    this.orderService.order.phoneNo =
      this.orderDetailsForm.get('phoneno')?.value;
    this.orderService.order.address =
      this.orderDetailsForm.get('address')?.value;
    this.orderService.order.email = this.orderDetailsForm.get('email')?.value;

    // history.pushState(null, '', location.href);
    // window.onpopstate = function () {
    //   history.go(1);
    // };

    this.dialog
      .open(ConfirmdialogComponent, {
        panelClass: 'dialog-responsive',
        position: { top: '3rem' },
        data: {
          title: 'Confirm Purchase',
          message:
            "Are you sure, you want to place the order?\nClick 'Yes' to continue.",
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.router.navigate(['/buy']);
          this.toastr.warning('Please do not refresh the page', 'WARNING!', {
            timeOut: 2000,
            closeButton: true,
            progressBar: true,
          });
        } else {
          this.router.navigate(['/shop']);
          this.toastr.info('Your order is not placed', '', {
            timeOut: 2000,
            positionClass: 'toast-bottom-center',
            closeButton: true,
            progressBar: true,
          });
        }
      });
  }
}
