import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/backend/cart.service';
import { Cartitem } from '../cartitem';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.scss']
})
export class CartdetailsComponent implements OnInit {


  cartItems:Cartitem[]=[];
  totalPrice:number=0;
  totalQuantity:number=0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(){
    //get a handle to the cart items
    this.cartItems = this.cartService.cartItems;

    //subscribe to the cart totalPrice
  this.cartService.totalPrice.subscribe(
    data => this.totalPrice = data
  );

    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity = data
    )

    //compute cart total price and quantity
    this.cartService.computeCartTotals();
  }


  incrementQuantity(tempCartItem){
    this.cartService.addToCart(tempCartItem);
  }


  decrementQuantity(tempCartItem){
    this.cartService.decrementQuantity(tempCartItem)
  }

  RemoveItem(theCartItem:Cartitem){
    this.cartService.remove(theCartItem);

  }



}
