import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { iif, Subscription } from 'rxjs';
import { GenericService } from 'src/app/services/generic/generic.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-checkoutdialog',
  templateUrl: './checkoutdialog.component.html',
  styleUrls: ['./checkoutdialog.component.scss']
})
export class CheckoutdialogComponent implements OnInit {



  checkoutFormGroup:FormGroup;
  onSave = new EventEmitter();
  onbilling = new EventEmitter();
  action: any;
  name: any;
  states:any=[];
  checked:boolean=false;
  isVisible:boolean=false;
  constructor(private formBuilder:FormBuilder,
    public generic:GenericService,
    private sharedService:SharedService,
    private aRoute:ActivatedRoute,
    public dialogRef: MatDialogRef<CheckoutComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data ) {

         }


  ngOnInit(): void {
    this.sameAsShipping();
    this.statesArray();
    this._formBuilder();

    // this.SaveFormData();


    this.action=this.data['action'];
    this.name=this.data['name'];
  }
   _formBuilder(){
    this.checkoutFormGroup=this.formBuilder.group({
     shippingAddress:this.formBuilder.group({
      Name:[''],
      companyName:[''],
      MobileNumber:[''],
      door:[''],
      area:[''],
      landmark:[''],
      city:[''],
      state:[''],
      pincode:['']
     }),
     billingAddress:this.formBuilder.group({
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
    })
   }


   shipping(){

    console.log("form reseting",this.checkoutFormGroup);
   let shipping=this.checkoutFormGroup.controls.shippingAddress.value;
   this.onSave.emit(shipping)
   this.generic.shipping=shipping;
   }

   statesArray(){
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

  sameAsShipping(){
    this.sharedService.isVisibleSource.subscribe(async (isVisible) =>{
      let Visible=isVisible;
      if(Visible==true){
        await this.checkoutFormGroup;
        console.log("calling",this.checkoutFormGroup);
        this.checkoutFormGroup?.controls?.billingAddress?.setValue(this.generic.shipping);
        this.SaveFormData(Visible);
      }if(Visible==false){
        this.checkoutFormGroup?.controls?.billingAddress.setValue(this.generic.billing);
        this.SaveFormData(Visible);
      }
    })
  }

  SaveFormData(Visible?){

    if(Visible==false){
      console.log("yes i am here")
    let billing=this.checkoutFormGroup?.controls?.billingAddress?.reset();
    }
    if(Visible==true){
      let billing=this.checkoutFormGroup.controls.shippingAddress.value;
      this.onbilling.emit(billing)
      this.generic.billing=billing;
    }

  }
}
