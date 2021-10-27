import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { UseraddComponent } from './component/useradd/useradd.component';
import { UsereditComponent } from './component/useredit/useredit.component';
import { UserlistComponent } from './component/userlist/userlist.component';
import { UserloginComponent } from './component/userlogin/userlogin.component';

const routes: Routes = [

  {path:'login',component:UserloginComponent},

  {path:'home',component:HomeComponent,children :[ {path: 'userlist', component: UserlistComponent},
  {path: 'useredit', component: UsereditComponent},
  {path:'useradd',component:UseraddComponent},
  {path:'useradd/:userId',component:UseraddComponent},
]},

{path: '', redirectTo: '/login', pathMatch: 'full'},
{path: '**', component: PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
