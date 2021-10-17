import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss']
})
export class UseraddComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onBack(){
  this.router.navigate(["/home/userlist"]);
  }

   // on Cancel button click
   onCancel() {
    this.router.navigate(["/home/userlist"]);
  }


  async saveUser() {
    }

}
