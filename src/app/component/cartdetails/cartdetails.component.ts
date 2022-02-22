import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/backend/cart.service';
import { Cartitem } from '../model/cartitem';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.scss']
})
export class CartdetailsComponent implements OnInit {


  cartItems:Cartitem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;
  deliverydate:any;
  getCartDetails:any=[];
  constructor(private cartService:CartService,private route:Router) { }



  ngOnInit(): void {
    // this.listCartDetails();
    this.cartDetails();
    this.Total();
    let today = new Date();
    this.deliverydate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
  }

  back(){
     this.route.navigate(['/home']);
  }

  cartDetails(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
      console.log("list details",this.getCartDetails);
    }
  }

  // listCartDetails(){
  //   //get a handle to the cart items
  //   this.cartItems = this.cartService.cartItems;

  //   //subscribe to the cart totalPrice
  // this.cartService.totalPrice.subscribe(
  //   data => this.totalPrice = data
  // );

  //   //subscribe to the cart totalQuantity
  //   this.cartService.totalQuantity.subscribe(
  //     data=>this.totalQuantity = data
  //   )

  //   //compute cart total price and quantity
  //   this.cartService.computeCartTotals();
  // }


  incrementQuantity(tempCartItem){
    // console.log("increment data is id",tempCartItem.id);
    // console.log("increment data is quantity",tempCartItem.qunantity);
    // this.cartService.addToCart(tempCartItem);
    for(let i=0;i<this.getCartDetails.length;i++){

      if(this.getCartDetails[i].id === tempCartItem.id ){
        if(tempCartItem.qunantity !=5){
          this.getCartDetails[i].qunantity = parseInt(tempCartItem.qunantity) + 1
        }
      }
    }
    localStorage.setItem("localCart",JSON.stringify(this.getCartDetails));
    this.Total();
  }


  decrementQuantity(tempCartItem){
    console.log("increment data is id",tempCartItem.id);
    console.log("increment data is quantity",tempCartItem.qunantity);

    for(let i=0;i<this.getCartDetails.length;i++){

      if(this.getCartDetails[i].id === tempCartItem.id ){
        if(tempCartItem.qunantity !=1){
          this.getCartDetails[i].qunantity = parseInt(tempCartItem.qunantity) - 1
        }
      }
    }
    localStorage.setItem("localCart",JSON.stringify(this.getCartDetails));
    this.Total();

  }

  // RemoveItem(theCartItem:Cartitem){
  //   // this.cartService.remove(theCartItem);

  // }

  removeAllProduct(){
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.totalPrice = 0;
    this.cartItem = 0 ;
    this.cartService.cartSubject.next(this.cartItem);
  }

  deleteOne(getCartDetail){
    console.log("cart details",getCartDetail);
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
      for(let i=0; i<this.getCartDetails.length; i++){
        if(this.getCartDetails[i].id === getCartDetail.id){
          this.getCartDetails.splice(i,1);
          localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
          this.Total();
          this.cartItemFunc();
        }
      }
    }

  }

  cartItem:number = 0;
  cartItemFunc(){
    if(localStorage.getItem('localCart') != null){
      var cartCount =  JSON.parse(localStorage.getItem('localCart'));
      this.cartItem = cartCount.length;
      this.cartService.cartSubject.next(this.cartItem);
    }
  }


  Total(){
    if(localStorage.getItem("localCart")){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
      this.totalPrice=this.getCartDetails.reduce(function(acc,val){
        return acc + (val.productPrice * val.qunantity);
      } , 0);
    }

  }



}
