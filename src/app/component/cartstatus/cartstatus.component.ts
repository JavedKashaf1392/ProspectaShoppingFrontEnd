import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/backend/cart.service';
import { GenericService } from 'src/app/services/generic/generic.service';

@Component({
  selector: 'app-cartstatus',
  templateUrl: './cartstatus.component.html',
  styleUrls: ['./cartstatus.component.scss']
})
export class CartstatusComponent implements OnInit {

  totalPrice:number = 0.00;
  totalQuantity:number = 0;

  constructor(private cartService:CartService,private generic:GenericService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }


  updateCartStatus() {
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data =>this.totalPrice = data
    )

    //susbsrice to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(data=>{
      this.totalQuantity = data,
      this.generic.price=this.totalPrice
    })



  }

}
