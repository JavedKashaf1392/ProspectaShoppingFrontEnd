import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cartitem } from 'src/app/component/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // find the item in the cart based on item id
  //check if we found it



  cartItems:Cartitem[]=[];
  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem:Cartitem){

     //check if we have already have he item in our cat
    let alreadyExistsInCart:boolean=false;
    let existingCartItem:Cartitem = undefined;

    if(this.cartItems.length > 0){

      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem) != undefined;
    }
    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem)
    }
    //compute cart total price and total quantity
    this.computeCartTotals();



   // find the item in the cart based on item id


   //check if we found it
  }
  computeCartTotals() {
   let totalPriceValue:number = 0;
   let totalQuantityValue:number = 0;
   for(let currentCartItem of this.cartItems){
    totalPriceValue += currentCartItem.quantity * currentCartItem.productPrice;
    totalQuantityValue += currentCartItem.quantity;
   }

   //publish the new value ...all susscriber will recevie the new data
   this.totalPrice.next(totalPriceValue);
   this.totalQuantity.next(totalQuantityValue)

    //Log cart data jus for debuggin purpose
  // this.logCartData(totalPriceValue,totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
   console.log("Content of the cart");
   for(let tempCartItem of this.cartItems){
     const subTotalPrice = tempCartItem.quantity * tempCartItem.productPrice;
    //  console.log(`name : ${tempCartItem.productName},quantity=${tempCartItem.quantity},
    //  price=${tempCartItem.productPrice},subTotalPrice=${subTotalPrice}`);
   }
  }



  decrementQuantity(theCartItem:Cartitem) {
    theCartItem.quantity--;
    if(theCartItem.quantity === 0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem) {
   const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
   if(itemIndex > -1){
     this.cartItems.splice(itemIndex,1);
     this.computeCartTotals();
   }
  }


}
