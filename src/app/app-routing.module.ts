import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth-components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './auth-components/signup/signup.component';
import { BrandsComponent } from './components/brands/brands.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authGuard } from './auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'',canActivate:[authGuard],component:HomeComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'restetpassword',component:ResetpasswordComponent},
  {path:'forgetpassword',component:ForgotPasswordComponent},
  {path:'home',canActivate:[authGuard],component:HomeComponent},
  {path:'brands',canActivate:[authGuard],component:BrandsComponent},
  {path:'product',canActivate:[authGuard],component:ProductsComponent},
  {path:'productdetails/:Id',canActivate:[authGuard],component:ProductDetailsComponent},
  {path:'category',canActivate:[authGuard],component:CategoryComponent},
  {path:'mycart',canActivate:[authGuard],component:MycartComponent},
  {path:'checkout',canActivate:[authGuard],component:PaymentComponent},
  {path:'allorders',canActivate:[authGuard],component:AllordersComponent},
  {path:'wishlist',canActivate:[authGuard],component:WishlistComponent},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
