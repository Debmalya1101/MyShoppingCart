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
    {path:'shop', component:ShoppingCartComponent},
    {path:'buy', component:PaymentpageComponent},
    {path:'paysuccess', component:PaymentsuccessComponent},
    {path:'profile', component:ProfileComponent},
    {path:'pagination', component:PaginationdemoComponent},
    {path:'myorders', component:OrdersComponent},
    {path:'orderDetails', component:OrderDetailsComponent},
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