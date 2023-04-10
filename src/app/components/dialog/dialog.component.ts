import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productForm!:FormGroup;
  product!:Product;
  actionBtn:string='Save';

  constructor(private fromBuilder:FormBuilder,
              private productService:ProductService,
              private dialogRef:MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public editData:Product) { }

  ngOnInit(): void {
    this.productForm=this.fromBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
      price:['',Validators.required],
      imageUrl:['',Validators.required],
      details:['',Validators.required],
      os:['',Validators.required],
      processor:['',Validators.required],
      ram_rom:['',Validators.required],
      rear_camera:['',Validators.required],
      front_camera:['',Validators.required],
      display:['',Validators.required],
      battery:['',Validators.required],
    })
    
    if(this.editData){
      this.actionBtn='Update'
      this.productForm.controls['name'].setValue(this.editData.name)
      this.productForm.controls['description'].setValue(this.editData.description)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['imageUrl'].setValue(this.editData.imageUrl)
      this.productForm.controls['details'].setValue(this.editData.details)
      this.productForm.controls['os'].setValue(this.editData.os)
      this.productForm.controls['processor'].setValue(this.editData.processor)
      this.productForm.controls['ram_rom'].setValue(this.editData.ram_rom)
      this.productForm.controls['rear_camera'].setValue(this.editData.rear_camera)
      this.productForm.controls['front_camera'].setValue(this.editData.front_camera)
      this.productForm.controls['display'].setValue(this.editData.display)
      this.productForm.controls['battery'].setValue(this.editData.battery)
    }
  }

  addProduct(){
    if(!this.editData){
      this.product=this.productForm.value;
      this.productService.addProducts(this.product).subscribe(data=>{
        this.productForm.reset();
        this.dialogRef.close('save');
      })
    }else{
      this.updateProduct();
    }
  }

  updateProduct(){
    this.product=this.productForm.value;
    this.product.id=this.editData.id;
    this.productService.updateProduct(this.product).subscribe(data=>{
      this.productForm.reset();
      this.dialogRef.close('update');
    })
  }

}
