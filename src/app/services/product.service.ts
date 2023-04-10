import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[]=[]
  // products:Product[]=[
  //   new Product(1,'Product 1','This is Product 1 description', 100),
  //   new Product(2,'Product 2','This is Product 2 description', 200),
  //   new Product(3,'Product 3','This is Product 3 description', 300),
  //   new Product(4,'Product 4','This is Product 4 description', 400),
  //   new Product(5,'Product 5','This is Product 5 description', 500),
  //   new Product(6,'Product 6','This is Product 6 description', 600),
  //   new Product(7,'Product 7','This is Product 7 description', 700),
  // ]
  constructor(private http:HttpClient) { }

  // getProducts():Product[]{
  //   //TODO: Populate products from an API/any other source and retrurn Observable
  //   let resp= this.http.get<Product[]>("http://localhost:8080/products")

  //   resp.subscribe(products => products.forEach(p => this.products.push(p)));
  //   console.log(this.products);
  //   return this.products
  // }

  getProducts(): Observable<Product[]>{

    return this.http.get<Product[]>("http://localhost:8080/products");

  }

  addProducts(product:Product): Observable<Product>{

    return this.http.post<Product>("http://localhost:8080/products", product);

  }
  
  updateProduct(product:Product): Observable<Product>{
    return this.http.put<Product>("http://localhost:8080/products", product);
  }

  deleteProduct(product:Product){
    return this.http.delete<Product>("http://localhost:8080/products/"+product.id);
  }

  getProductByPrice(start:number,end:number){
    return this.http.get<Product[]>("http://localhost:8080/products/"+start+"/"+end);
  }

}
