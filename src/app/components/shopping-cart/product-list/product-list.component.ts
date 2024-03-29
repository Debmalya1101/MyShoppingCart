import { ResetpricefiltermessengerService } from './../../../services/resetpricefiltermessenger.service';
import { Filter } from './../../../models/filter';
import { FiltermessengerService } from './../../../services/filtermessenger.service';
import { User } from 'src/app/models/user';
import { WishlistService } from './../../../services/wishlist.service';
import { Product } from './../../../models/product';
import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = []
  wishlist: number[] = []
  user!: User
  filter!: Filter

  //added for pagination
  products!: Product[]
  productsPerPage: number = 3;
  productListLength!: number;
  public selectedPage = 1
  //ends here
  pageNumbers!:number[]

  //for filter pagination
  isfilter:boolean=false
  filterProductsPerPage = 3;
  filterProductListLength!: number;
  public filterSelectedPage = 1

  constructor(private productService: ProductService,
    private wishlistService: WishlistService,
    private filtermsg: FiltermessengerService,
    private resetpricefiltermsg: ResetpricefiltermessengerService,
    public jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    // this.productList=this.productService.getProducts()
    // console.log(this.productList.length)
    this.getProducts()
    this.loadWishlist()
    this.handleFilterMsg()
    this.resetFilterMsg()
  }

  getProducts() {

    this.productService.getProducts().subscribe((data) => {

      this.selectedPage=1

      this.productList = data;
      // for normal pagination
      this.productListLength = this.productList.length;
      let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
      this.products = this.productList.slice(pageIndex, this.productsPerPage);
      //for filter pagination
      this.isfilter=false

      this.pageNumbers=Array(Math.ceil(this.productListLength / this.productsPerPage)).fill(0).map((x, i) => i + 1);

    });
  }

  //for normal pagination functions
  changePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value
    this.productsPerPage = Number(newSize);
    this.changePage(1)
  }

  // get pageNumbers(): number[] {
  //   // console.log(this.productListLength)
  //   return Array(Math.ceil(this.productListLength / this.productsPerPage))
  //     .fill(0).map((x, i) => i + 1);
  // }

  changePage(page: any) {
    this.selectedPage = page;
    this.slicedProducts();
  }

  slicedProducts() {
    let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    let endIndex = (this.selectedPage - 1) * this.productsPerPage + this.productsPerPage;
    this.products = [];
    this.productService.getProducts().subscribe(data => {
      this.productList = data;
      this.products = this.productList.slice(pageIndex, endIndex);
    })
    this.loadWishlist();

  }
  //normal pagination functions list end here


  //functions for filter pagination
  filterChangePageSize(event: Event) {
    const newSize = (event.target as HTMLInputElement).value
    this.filterProductsPerPage = Number(newSize);
    this.filterChangePage(1)
  }

  get filterPageNumbers(): number[] {
    return Array(Math.ceil(this.filterProductListLength / this.filterProductsPerPage))
      .fill(0).map((x, i) => i + 1);
  }

  filterChangePage(page: any) {
    this.filterSelectedPage = page;
    this.filterSlicedProducts();
  }

  filterSlicedProducts() {
    let pageIndex = (this.filterSelectedPage - 1) * this.filterProductsPerPage;
    let endIndex = (this.filterSelectedPage - 1) * this.filterProductsPerPage + this.filterProductsPerPage;
    this.products = [];
    this.productService.getProductByPrice(this.filter.start, this.filter.end).subscribe((data) => {
      this.productList = data;
      this.products = this.productList.slice(pageIndex, endIndex);
    })
  }
  //ends


  //wishlist function
  loadWishlist() {
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    console.log(this.user)
    // this.user = JSON.parse(localStorage.getItem('user')!)
    this.wishlistService.getWishlist(this.user).subscribe(data => {
      data.forEach((w: any) => this.wishlist.push(w.productId));
      //console.log(this.wishlist)
    })
  }


  //This methods are for filters
  handleFilterMsg() {
    this.filtermsg.getMsg().subscribe((data: any) => {
      this.filter = data;
      this.filterSelectedPage=1
      this.productService.getProductByPrice(this.filter.start, this.filter.end).subscribe((data) => {
        this.productList = data;
        // for filter pagination
        this.isfilter=true;
        this.filterProductListLength = this.productList.length;
        let pageIndex = (this.filterSelectedPage - 1) * this.filterProductsPerPage;
        this.products = this.productList.slice(pageIndex, this.filterProductsPerPage);

        this.loadWishlist();
      })
    })
  }

  resetFilterMsg() {
    this.resetpricefiltermsg.getMsg().subscribe(() => {
      this.getProducts();
      this.loadWishlist();
    })
  }

}
