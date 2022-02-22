import { Product } from "./product";

export class Cartitem {
  id           : number;
  productName  : string;
  productPrice : number;
  imageUrl        : string;
  quantity     : number;

  constructor(product:Product){
    this.id=product.id;
    this.productName=product.productName;
    this.productPrice=product.productPrice;
    this.imageUrl=product.photo;
    this.quantity = 1 ;
  }
}
