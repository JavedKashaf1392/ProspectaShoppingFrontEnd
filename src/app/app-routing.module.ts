import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartdetailsComponent } from './component/cartdetails/cartdetails.component';
import { CreatecategoryComponent } from './component/createcategory/createcategory.component';
import { CreatuserComponent } from './component/creatuser/creatuser.component';
import { HomeComponent } from './component/home/home.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { UseraddComponent } from './component/useradd/useradd.component';
import { UsereditComponent } from './component/useredit/useredit.component';
import { UserlistComponent } from './component/userlist/userlist.component';
import { UserloginComponent } from './component/userlogin/userlogin.component';
import { ProductlistComponent } from './component/productlist/productlist.component';
import { ProductaddComponent } from './component/productadd/productadd.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { CheckoutdialogComponent } from './component/checkoutdialog/checkoutdialog.component';
import { PaymentComponent } from './component/payment/payment.component';
import { CategorylistComponent } from './component/categorylist/categorylist.component';
import { BrandsComponent } from './component/brands/brands.component';
import { AddbrandComponent } from './component/addbrand/addbrand.component';

const routes: Routes = [
  {path:"dialog",component:CheckoutdialogComponent},
  {path:'login',component:UserloginComponent},
  {path:"register",component:CreatuserComponent},

  {path:'home',component:HomeComponent,children :[ {path: 'userlist', component: UserlistComponent},
  {path: 'useredit', component: UsereditComponent},
  {path: 'cartdetails', component: CartdetailsComponent},
  {path:'useradd',component:UseraddComponent},
  {path:'useradd/:userId',component:UseraddComponent},
  {path:'createcategory',component:CreatecategoryComponent},
  {path:'categorylist',component:CategorylistComponent},
  {path:'createcategory/:id',component:CreatecategoryComponent},
  {path:"addproduct",component:ProductaddComponent},
  {path:"listproduct",component:ProductlistComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"payment",component:PaymentComponent},
  {path:"brandlist",component:BrandsComponent},
  {path:"addbrand",component:AddbrandComponent},
  {path:"addbrand/:brandId",component:AddbrandComponent},



]},

{path: '', redirectTo: '/login', pathMatch: 'full'},
{path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
