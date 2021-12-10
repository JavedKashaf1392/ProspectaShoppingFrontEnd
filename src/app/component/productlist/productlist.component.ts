import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitem } from '../cartitem';
import { Product } from '../product';
import { BackendService } from '../../services/backend/backend.service';
import { CartService } from '../../services/backend/cart.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  constructor(private backend:BackendService,private router:Router,private cartService:CartService) { }

  product:Product=new Product();
  ngOnInit(): void {
    this.ProductAllDataForTable();
  }


    //get the companyAllData for the forms
    ProductAllDataForTable() {
      this.backend.getAllProducts().subscribe((data) => {
        this.product = data["list"];
        console.log("Data for testing",this.product);
      });
    }

    addToCart(theProduct){
      console.log("buying",theProduct);

      const theCartItem=new Cartitem(theProduct);
      this.cartService.addToCart(theCartItem);
    }

}
