import { ResetpricefiltermessengerService } from './../../../services/resetpricefiltermessenger.service';
import { Filter } from './../../../models/filter';
import { ProductService } from 'src/app/services/product.service';
import { FiltermessengerService } from './../../../services/filtermessenger.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filter=new Filter();
  pricefilter=true
  resetpricefilter=false

  constructor(private filtermes:FiltermessengerService, 
              private productservice:ProductService,
              private resetfiltermsg:ResetpricefiltermessengerService) { }

  ngOnInit(): void {
  }

  handlefilter(){
    this.pricefilter=false
    this.resetpricefilter=true
    this.productservice.getProductByPrice(this.filter.start,this.filter.end).subscribe(()=>{
      this.filtermes.sendMsg(this.filter);
    })
  }

  resetfilter(){
    this.pricefilter=true
    this.resetpricefilter=false
    this.filter=new Filter();
    this.resetfiltermsg.sendMsg(this.filter)
  }

}
