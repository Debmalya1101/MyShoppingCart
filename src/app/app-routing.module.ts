import { SaleschartComponent } from './components/adminhome/saleschart/saleschart.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AuthGuard } from './components/shared/auth/auth.guard';
import { ProductDetailsComponent } from './components/shopping-cart/product-details/product-details.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrdersComponent } from './components/shared/nav/orders/orders.component';
import { PaginationdemoComponent } from './components/paginationdemo/paginationdemo.component';
import { ProfileComponent } from './components/shared/nav/profile/profile.component';

import { PaymentsuccessComponent } from './components/buy-now/paymentsuccess/paymentsuccess.component';
import { BuyNowComponent } from './components/buy-now/buy-now.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { PaymentpageComponent } from './components/order-details/paymentpage/paymentpage.component';

const routes : Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'shop', component:ShoppingCartComponent, canActivate:[AuthGuard], data:{
        roles:["ROLE_ADMIN", "ROLE_USER"]
    }},
    {path:'buy', component:PaymentpageComponent, canActivate:[AuthGuard], data:{
        roles:["ROLE_ADMIN", "ROLE_USER"]
    }},
    {path:'paysuccess', component:PaymentsuccessComponent, canActivate:[AuthGuard], data:{
        roles:["ROLE_ADMIN", "ROLE_USER"]
    }},
    {path:'profile', component:ProfileComponent, canActivate:[AuthGuard], data:{
        roles:["ROLE_ADMIN", "ROLE_USER"]
    }},
    {path:'myorders', component:OrdersComponent, canActivate:[AuthGuard], data:{
        roles:["ROLE_ADMIN", "ROLE_USER"]
    }},
    {path:'orderDetails', component:OrderDetailsComponent, canActivate:[AuthGuard], data:{
        roles:["ROLE_ADMIN", "ROLE_USER"]
    }},
    {path:'productDetails', component:ProductDetailsComponent, canActivate:[AuthGuard], data:{
        roles:["ROLE_ADMIN", "ROLE_USER"]
    }},
    {path:'admin', component:AdminhomeComponent, canActivate:[AuthGuard],data:{
        roles:["ROLE_ADMIN"]
    }},
    {path:'sales', component:SaleschartComponent, canActivate:[AuthGuard],data:{
        roles:["ROLE_ADMIN"]
    }},
    {path:'**', component:PageNotFoundComponent}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}