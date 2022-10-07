export class Product {
    id:number;
    name:string;
    description:string;
    price:number;
    imageUrl:string;

    constructor(id=0,name='', description='', price=0, imageUrl='https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/71PvHfU+pwL._AC_UY327_FMwebp_QL65_.jpg'){
        this.id=id
        this.name=name
        this.description=description
        this.price=price
        this.imageUrl=imageUrl
    }
}
