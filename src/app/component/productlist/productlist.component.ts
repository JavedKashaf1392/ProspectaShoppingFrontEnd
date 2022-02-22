import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitem } from '../model/cartitem';
import { Product } from '../model/product';
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

    itemsCart:any=[];
    addToCart(category){
      console.log("buying",category);

      let cartDataNull=localStorage.getItem('localCart');
      if(cartDataNull == null){
        let storeDataGet:any=[];
        storeDataGet.push(category);
        localStorage.setItem('localCart',JSON.stringify(storeDataGet));
      }else{
        var id=category.id;
        let index:number=-1;
        this.itemsCart = JSON.parse(localStorage.getItem('localCart'));
        for(let i=0;i<this.itemsCart.length;i++){
          if(parseInt(id) ===  parseInt(this.itemsCart[i].id)){
            //do something here
            // this.itemsCart[i].productQyt=category.productQyt;
            index =i;
            console.log("its already exit the component");
            break;
          }
        }
        if(index == -1){
          this.itemsCart.push(category);
          localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
        }
        else{
          localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
        }

      }
      this.cartNumberFunc();
      // const theCartItem=new Cartitem(theProduct);
      // this.cartService.addToCart(theCartItem);
    }

    cartNumber:number = 0;
    cartNumberFunc(){
      var cartValue = JSON.parse(localStorage.getItem('localCart'));
      this.cartNumber = cartValue.length;
      this.cartService.cartSubject.next(this.cartNumber);
      console.log(this.cartNumber);

    }

}
