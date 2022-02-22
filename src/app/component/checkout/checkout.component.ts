import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BackendService } from 'src/app/services/backend/backend.service';
import { CartService } from 'src/app/services/backend/cart.service';
import { GenericService } from 'src/app/services/generic/generic.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { environment } from 'src/environments/environment';
import { CheckoutdialogComponent } from '../checkoutdialog/checkoutdialog.component';
import { Order } from '../model/order';
import { OrderItem } from '../model/order-item';
import { PaymentInfo } from '../model/payment-info';
import { Purchase } from '../model/purchase';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup:FormGroup;
  email: string;
  checked = false;
  totalPrice:number = 0.00;
  totalQuantity:number = 0;

  shipping:any;
  billing:any;


  paymentInfo:PaymentInfo = new PaymentInfo();
  cardElement:any;
  displayError:any="";


  constructor(private formBuilder:FormBuilder,
    public dialog: MatDialog,
    public cartService:CartService,
    public generic:GenericService,
    public sharedService:SharedService,
    public backend:BackendService,
    private route:Router
    ) { }



  ngOnInit(): void {
    this.reviewCartDetails();
    this.email=localStorage.getItem("currentUser");
  }




  shippingDialog(action,name){
    const dialogRef = this.dialog.open(CheckoutdialogComponent,{
      height: '48em',
      width: '33em',
      panelClass:"custom",
      backdropClass:'backdropBackground',
      data:{
        'action':action,
        'name':name,
    },
    autoFocus: false,
    disableClose: true
    });



    dialogRef.componentInstance.onSave.subscribe(data=> {
      this.shipping=data;
      console.log("data shipping",this.shipping);
    })

    dialogRef.componentInstance.onbilling.subscribe(data=> {
      this.billing=data;
      console.log("data billing",this.billing);
    })
  }

  back(){

  }

  SameAsShippingAddress(event){
    if(event.checked==true){
      this.checked=event.checked;
      let res=this.sharedService.isVisibleSource.next(this.checked);
    }
    if(event.checked==false){
      this.checked=event.checked;
      let res=this.sharedService.isVisibleSource.next(this.checked);
    }
  }

  payment(){

  let order=new Order();

  //SetUp order
  order.totalPrice=this.totalPrice;
  order.totalQuantity=this.totalQuantity;

  //set the cartItems
  const cartItems = this.cartService.cartItems;

  //create order items from cartitems

  //longway
  // let orderItems:OrderItem[]=[];
  // for(let i=0;i<cartItems.length;i++){
  //   orderItems[i]=new OrderItem(cartItems[i]);
  // }


     //-short way of doing the same thing
     let orderItems = cartItems.map(tempOrderItem => new OrderItem(tempOrderItem));

     //set up purchase
     let purchase =new Purchase();
     purchase.customer={
      name:this.shipping['Name'],
      email:this.email,
      phoneNumber:this.shipping['MobileNumber'],
      companyName:this.shipping['companyName']
     };

     //purchase shipping
     purchase.shippingAddress={
      doorAndStree:this.shipping['door'],
      AreaAndLocality:this.shipping['area'],
      landMark:this.shipping['landmark'],
      City:this.shipping['city'],
      State:this.shipping['state'],
      country:'India',
      Pincode:this.shipping['pincode']
     };

      //purchase shipping
      purchase.billingAddress={
        doorAndStree:this.shipping['door'],
        AreaAndLocality:this.shipping['area'],
        landMark:this.shipping['landmark'],
        City:this.shipping['city'],
        State:this.shipping['state'],
        country:'India',
        Pincode:this.shipping['pincode']
       };

       //populate purchase order and Items
       purchase.order=order;
       purchase.orderItems=orderItems;



              // call REST API via the CheckoutService
              // this.backend.placeOrder(purchase).subscribe({
              //   next: response => {
              //     alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

              //     // reset cart
              //     this.resetCart();
              //   },

              // })
              console.log("navigation")
              this.route.navigate(['/home/payment'])
  }
  resetCart() {
  //reset cart data
  this.cartService.cartItems = [];
  this.cartService.totalPrice.next(0);
  this.cartService.totalQuantity.next(0);

  //reset the form
  this.checkoutFormGroup.reset();

  //navigat to the page
  this.route.navigateByUrl("/home");
  }

  reviewCartDetails() {
    //subscrite to the cartService.totalQuanity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
      )

    //subscribe to the cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    )}}
