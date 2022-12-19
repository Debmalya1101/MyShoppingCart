import { Product } from './../../../models/product';
import { ProductDetailsMessangerService } from './../../../services/product-details-messanger.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product!:Product

  constructor(private detailsService:ProductDetailsMessangerService) { }

  ngOnInit(): void {
    this.handleSubscription()
    this.product=JSON.parse(sessionStorage.getItem('product')!)
  }

  handleSubscription(){
    this.detailsService.getMsg().subscribe(data=>{
      this.product=data
      console.log(data);
    })
  }

}
