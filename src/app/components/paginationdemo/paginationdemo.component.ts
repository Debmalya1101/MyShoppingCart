import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginationdemo',
  templateUrl: './paginationdemo.component.html',
  styleUrls: ['./paginationdemo.component.css']
})
export class PaginationdemoComponent implements OnInit {

  productList!: Product[]
  products!:Product[]
  productsPerPage: number = 3;
  productListLength!:number;
  public selectedPage=1

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
      this.productListLength=this.productList.length;
      let pageIndex = (this.selectedPage -1) * this.productsPerPage;
      this.products = this.productList.slice(pageIndex, this.productsPerPage);
    })
  }

  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value
    this.productsPerPage=Number(newSize);
    this.changePage(1)
  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.productListLength / this.productsPerPage))
      .fill(0).map((x, i) => i + 1);
  }

  changePage(page:any){
    this.selectedPage=page;
    this.slicedProducts();
  }

  slicedProducts(){
    let pageIndex = (this.selectedPage -1) * this.productsPerPage;
    let endIndex = (this.selectedPage -1) * this.productsPerPage + this.productsPerPage;
    this.products=[];
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
      this.products = this.productList.slice(pageIndex, endIndex);
    })
    
  }

}
