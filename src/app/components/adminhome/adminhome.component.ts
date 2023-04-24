import { User } from './../../models/user';
import { ConfirmdialogComponent } from './../confirmdialog/confirmdialog.component';
import { DialogComponent } from './../dialog/dialog.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  productList: Product[] = []
  p: number = 1;
  user!:User;

  displayedColumns: string[] = ['select','ProductID', 'Name', 'Description','Front_Camera','Rear_Camera','Price', 'Image', 'Action'];
  dataSource = new MatTableDataSource<Product>();
  selection = new SelectionModel<Product>(true, []);

  constructor(private productService: ProductService,
              public dialog: MatDialog,
              private toastr: ToastrService,
              public jwtHelper: JwtHelperService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ngAfterViewInit() {
  //   console.log(this.dataSource)
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit(): void {
    this.user = this.jwtHelper.decodeToken(JSON.parse(sessionStorage.getItem('token')!))!
    this.getProducts()
  }

  getProducts(){
    this.productService.getProducts().subscribe((data)=>{
      this.productList = data;
      this.productList=this.productList.reverse();
      this.dataSource.data=data;
      this.dataSource.paginator=this.paginator;
    })
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width:'35%'
    }).afterClosed().subscribe(data=>{
      if(data=='save'){
        this.getProducts();
        this.toastr.success('Product added Successfully', '',{
          timeOut:2500,
          positionClass: 'toast-bottom-center',
          closeButton: true,
          progressBar: true,
        });
      }
    })
  }

  editProduct(row:Product){
    this.dialog.open(DialogComponent,{
      width:'35%',
      data:row
    }).afterClosed().subscribe(data=>{
      if(data=='update'){
        this.getProducts()
        this.toastr.info('Product Updated Successfully', '',{
          timeOut:2500,
          positionClass: 'toast-bottom-center',
          progressBar: true,
        });
      }
    })
  }

  deleteProduct(row:Product){
    // let q = confirm("Are you sure you want delete this product?\nClick 'OK' to continue.")
    this.dialog.open(ConfirmdialogComponent,{
      width:'30%',
      position:{top:'5rem'},
      data:{
        title: 'Confirm Remove Product',
        message: 'Are you sure, you want to delete the Product: '+row.name
      }
    }).afterClosed().subscribe(data=>{
      console.log(data);
      if(data){
        this.productService.deleteProduct(row).subscribe(data=>{
          this.getProducts();
          this.toastr.success('Product Deleted', '',{
            timeOut:2500,
            positionClass: 'toast-bottom-center',
            closeButton: true,
            progressBar: true,
          });
        })
      }
    })
  }

  multipleDelete(){

    this.dialog.open(ConfirmdialogComponent,{
      width:'30%',
      position:{top:'5rem'},
      data:{
        title: 'Confirm Remove Product(s)',
        message: 'Are you sure, you want to delete the '+this.selection.selected.length+' Product(s)'
      }
    }).afterClosed().subscribe(data=>{
      if(data){
        this.selection.selected.forEach(data=>{
          this.productService.deleteProduct(data).subscribe(data=>{
            this.getProducts()
          })
        })
        this.selection.clear()
        this.toastr.success('Product Deleted', '',{
          timeOut:2500,
          positionClass: 'toast-bottom-center',
          closeButton: true,
          progressBar: true,
        });
      }
    })

  }


  loggedOutUser(){
    sessionStorage.clear()
    this.toastr.success('You have successfully Logged out', 'Success!',{
      timeOut:2000,
      closeButton: true,
      progressBar: true,
    });
  }

}
