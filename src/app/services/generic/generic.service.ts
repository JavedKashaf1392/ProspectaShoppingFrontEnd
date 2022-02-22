import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  activeTab = "Active";
  public token: string;
  public selectedTab: string;
  public  keyword:string;
  public imageList:any;
  public price:number;
  public shipping:any;
  public billing:any;
  public shippingPay:any;
  public billingPay:any;
  public categoryList:any;

  constructor() { }
}
