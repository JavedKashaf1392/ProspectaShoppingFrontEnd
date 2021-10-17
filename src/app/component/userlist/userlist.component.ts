import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource;
  usersData = [];
  pageSize;
  name;
  email;
  dp1Selection;
  dp2Selection;
  dp3Selection;

  constructor(
    private router: Router)
    { }

  ngOnInit(): void {
  }

  navigateAdd(){
    this.router.navigate(["/home/useradd"])

  }

  search(){

  }

}


