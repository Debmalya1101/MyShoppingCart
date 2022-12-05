export class Orders {
    orderId: number;
    userId: number;
    orderDate: Date;
    products: String;
    total: number;

    constructor(orderId: number,
        userId: number,
        orderDate: Date,
        products: String,
        total: number) {
            this.orderId=orderId;
            this.userId=userId;
            this.orderDate=orderDate;
            this.products=products;
            this.total=total;
    }
}
