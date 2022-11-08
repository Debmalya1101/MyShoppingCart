
import { PaymentsuccessComponent } from './components/buy-now/paymentsuccess/paymentsuccess.component';
import { BuyNowComponent } from './components/buy-now/buy-now.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

const routes : Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'shop', component:ShoppingCartComponent},
    {path:'buy', component:BuyNowComponent},
    {path:'paysuccess', component:PaymentsuccessComponent},
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