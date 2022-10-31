export class Wishlist {
    productId:number;
    name: String;
    price:number;

    constructor(productId:number, name:String, price:number){
        this.productId=productId;
        this.name=name;
        this.price=price;
    }
}
