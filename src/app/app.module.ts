import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './component/userlist/userlist.component';
import { UsereditComponent } from './component/useredit/useredit.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UseraddComponent } from './component/useradd/useradd.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserloginComponent } from './component/userlogin/userlogin.component';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FileuploadComponent } from './component/fileupload/fileupload.component';
import { HttpintercepterInterceptor } from './services/intercepter/httpintercepter.interceptor';
import { AuthenticationguardGuard } from './services/guard/authenticationguard.guard';
import { AuthenticationService } from './services/authentication/authentication.service';
import { CreatecategoryComponent } from './component/createcategory/createcategory.component';
import { ListcategoryComponent } from './component/listcategory/listcategory.component';
import { CreatuserComponent } from './component/creatuser/creatuser.component';
import { ProductlistComponent } from './component/productlist/productlist.component';
import { ProducteditComponent } from './component/productedit/productedit.component';
import { CartstatusComponent } from './component/cartstatus/cartstatus.component';
import { CartdetailsComponent } from './component/cartdetails/cartdetails.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { ProductaddComponent } from './component/productadd/productadd.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { CheckoutdialogComponent } from './component/checkoutdialog/checkoutdialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';




@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    UsereditComponent,
    PagenotfoundComponent,
    HomeComponent,
    UseraddComponent,
    UserloginComponent,
    SidenavComponent,
    FileuploadComponent,
    CreatecategoryComponent,
    ListcategoryComponent,
    CreatuserComponent,
    ProductlistComponent,
    ProductaddComponent,
    ProducteditComponent,
    CartstatusComponent,
    CartdetailsComponent,
    CheckoutComponent,
    CheckoutdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    DragDropModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatDialogModule,
    MatCheckboxModule


  ],
  providers: [AuthenticationguardGuard,AuthenticationService,

    {provide:HTTP_INTERCEPTORS,useClass:HttpintercepterInterceptor,multi:true}
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
