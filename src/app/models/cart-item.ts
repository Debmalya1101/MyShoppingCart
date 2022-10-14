import { Product } from './product';
export class CartItem {
    id:number;
    productId:number;
    productName:string;
    qty:number;
    price:number;
    userId:number;

    constructor(id:number, product:Product, qty:number, userId:number){
        this.id=id;
        this.productId=product.id;
        this.productName=product.name;
        this.qty=qty;
        this.price=product.price;
        this.userId=userId;
    }
}
