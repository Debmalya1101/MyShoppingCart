import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FiltersComponent } from './components/shopping-cart/filters/filters.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { BuyNowComponent } from './components/buy-now/buy-now.component';
import { PaymentsuccessComponent } from './components/buy-now/paymentsuccess/paymentsuccess.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './components/shared/nav/profile/profile.component';
import { PaginationdemoComponent } from './components/paginationdemo/paginationdemo.component';
import { OrdersComponent } from './components/shared/nav/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { PaymentpageComponent } from './components/order-details/paymentpage/paymentpage.component';
import { ProductDetailsComponent } from './components/shopping-cart/product-details/product-details.component';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table' ;
import { MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConfirmdialogComponent } from './components/confirmdialog/confirmdialog.component';
import { SaleschartComponent } from './components/adminhome/saleschart/saleschart.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    BuyNowComponent,
    PaymentsuccessComponent,
    ProfileComponent,
    PaginationdemoComponent,
    OrdersComponent,
    OrderDetailsComponent,
    PaymentpageComponent,
    ProductDetailsComponent,
    AdminhomeComponent,
    DialogComponent,
    ConfirmdialogComponent,
    SaleschartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        // ...
        throwNoTokenError: false,
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
