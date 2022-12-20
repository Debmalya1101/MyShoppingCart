export class Product {
    id:number;
    name:string;
    description:string;
    price:number;
    imageUrl:string;

    details:string;
    os:string;
    processor:string;
    ram_rom:string;
    rear_camera:string;
    front_camera:string;
    display:string;
    battery:string;

    constructor(id=0,name='', description='', price=0, imageUrl='https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/71PvHfU+pwL._AC_UY327_FMwebp_QL65_.jpg',
                deatails='',os='',processor='',ram_rom='',rear_camera='',front_camera='', display='',battery=''){
        this.id=id
        this.name=name
        this.description=description
        this.price=price
        this.imageUrl=imageUrl

        this.details=deatails
        this.os=os;
        this.processor=processor
        this.ram_rom=ram_rom
        this.rear_camera=rear_camera
        this.front_camera=front_camera
        this.display=display
        this.battery=battery
    }
}
