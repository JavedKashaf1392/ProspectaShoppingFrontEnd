import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from 'src/app/services/backend/cart.service';
import { GenericService } from 'src/app/services/generic/generic.service';
import { CheckoutdialogComponent } from '../checkoutdialog/checkoutdialog.component';

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
  // states:any=[
  //   {id:1,name:"Andhra Pradesh"},
  //   {id:2,name:"Arunachal Pradesh"},
  //   {id:3,name:"Assam"},
  //   {id: 4,name:"Bihar"},
  //   {id: 5,name:"Chhattisgarh"},
  //   {id: 6,name:"Goa"},
  //   {id: 7,name:"Gujarat"},
  //   {id: 8,name:"Haryana"},
  //   {id: 9,name:"Himachal Pradesh"},
  //   {id: 10,name:"Jharkhand"},
  //   {id: 11,name:"Karnataka"},
  //   {id:12,name:"Kerala"},
  //   {id: 13,name:"Madhya Pradesh"},
  //   {id: 14,name:"Maharashtra"},
  //   {id: 15,name:"Manipur"},
  //   {id: 16,name:"Meghalaya"},
  //   {id: 17,name:"Mizoram"},
  //   {id: 18,name:"Nagaland"},
  //   {id: 19,name:"Odisha"},
  //   {id: 20,name:"Punjab"},
  //   {id: 21,name:"Rajasthan"},
  //   {id: 22,name:"Sikkim"},
  //   {id: 23,name:"Tamil Nadu"},
  //   {id: 24,name:"Telangana"},
  //   {id: 25,name:"Tripura"},
  //   {id: 26,name:"Uttar Pradesh"},
  //   {id: 27,name:"Uttarakhand"},
  //   {id: 28,name:"West Bengal"},
  // ];
  states:any=[
    {id:1,name:"Andhra Pradesh"},
    {id:2,name:"Arunachal Pradesh"},
    {id:3,name:"Assam"},
    {id: 4,name:"Bihar"},
    {id: 5,name:"Chhattisgarh"},
    {id: 6,name:"Goa"},
    {id: 7,name:"Gujarat"},
    {id: 8,name:"Haryana"},
    {id: 9,name:"Himachal Pradesh"},
    {id: 10,name:"Jharkhand"},
    {id: 11,name:"Karnataka"},
    {id:12,name:"Kerala"},
    {id: 13,name:"Madhya Pradesh"},
    {id: 14,name:"Maharashtra"},
    {id: 15,name:"Manipur"},
    {id: 16,name:"Meghalaya"},
    {id: 17,name:"Mizoram"},
    {id: 18,name:"Nagaland"},
    {id: 19,name:"Odisha"},
    {id: 20,name:"Punjab"},
    {id: 21,name:"Rajasthan"},
    {id: 22,name:"Sikkim"},
    {id: 23,name:"Tamil Nadu"},
    {id: 24,name:"Telangana"},
    {id: 25,name:"Tripura"},
    {id: 26,name:"Uttar Pradesh"},
    {id: 27,name:"Uttarakhand"},
    {id: 28,name:"West Bengal"},
  ];

  constructor(private formBuilder:FormBuilder,public dialog: MatDialog,public cartService:CartService,public generic:GenericService) { }



  ngOnInit(): void {
    console.log("states",this.states);
    this.totalPrice=this.generic.price ? this.generic.price :this.totalPrice;
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
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  back(){

  }



}
