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

const routes: Routes = [
  {path:'login',component:UserloginComponent},
  {path:"register",component:CreatuserComponent},

  {path:'home',component:HomeComponent,children :[ {path: 'userlist', component: UserlistComponent},
  {path: 'useredit', component: UsereditComponent},
  {path: 'cartdetails', component: CartdetailsComponent},
  {path:'useradd',component:UseraddComponent},
  {path:'useradd/:userId',component:UseraddComponent},
  {path:'createcategory',component:CreatecategoryComponent},
  {path:"addproduct",component:ProductaddComponent},
  {path:"listproduct",component:ProductlistComponent},
  {path:"checkout",component:CheckoutComponent},
]},

{path: '', redirectTo: '/login', pathMatch: 'full'},
{path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
