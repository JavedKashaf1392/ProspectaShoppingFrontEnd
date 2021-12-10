import { Product } from "./product";

export class Cartitem {
  id           : number;
  productName  : string;
  productPrice : number;
  photo        : string;
  quantity     : number;

  constructor(product:Product){
    this.id=product.id;
    this.productName=product.productName;
    this.productPrice=product.productPrice;
    this.photo=product.photo;
    this.quantity = 1 ;
  }
}
