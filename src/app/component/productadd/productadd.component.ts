import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.scss']
})
export class ProductaddComponent implements OnInit {

 product : Product=new Product();
 message : any;

  constructor(private backend:BackendService,private router:Router) {}
  ngOnInit(): void {

  }

  saveProduct(){
    this.backend.saveProduct(this.product).subscribe(
      data => {
        console.log(data);
        this.message=data;
      },
      error =>{
        console.log(error);
      }
      );
  }
}
