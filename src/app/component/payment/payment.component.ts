import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/backend/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  totalPrice:number = 0.00;


  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.reviewCartDetails();
  }

  reviewCartDetails() {
    //subscribe to the cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    )}
  }




