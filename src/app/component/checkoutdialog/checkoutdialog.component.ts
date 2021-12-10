import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-checkoutdialog',
  templateUrl: './checkoutdialog.component.html',
  styleUrls: ['./checkoutdialog.component.scss']
})
export class CheckoutdialogComponent implements OnInit {

  checkoutFormGroup:FormGroup;
  action: any;
  name: any;
  states:any=[];


  constructor(private formBuilder:FormBuilder,
    public dialogRef: MatDialogRef<CheckoutComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data ) { }

  ngOnInit(): void {
    this.statesdropdown();
    this._formBuilder();
    this.action=this.data['action'];
    this.name=this.data['name'];

    console.log("data",this.action);
  }
   _formBuilder(){
    this.checkoutFormGroup=this.formBuilder.group({
      Name:[''],
      companyName:[''],
      MobileNumber:[''],
      door:[''],
      area:[''],
      landmark:[''],
      city:[''],
      state:[''],
      pincode:['']
    })
   }


   save(){
    let raw = this.checkoutFormGroup.value;
    console.log("checkout form",raw);


   }

   billing(){

   }

   statesdropdown(){
    this.states=[
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
   }
}
