import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import  clonedeep from 'lodash.clonedeep';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('table') table: MatTable<any>

  displayedColumns: string[] = [
    "userId",
    "email",
    "firstName",
    "lastName",
    "phoneNumber",
    "role",
    "status"
  ];

  dataSource;
  usersData = [];
  pageSize;
  name;
  email;
  dp1Selection;
  dp2Selection;
  dp3Selection;
  userId;
  phoneNumber: any;
  dataJson:any;
  firstName: any;

  constructor(
    private router: Router,
    private backEnd:BackendService,
    private snackBar: MatSnackBar

    )
    { }

  ngOnInit(): void {
    this.getAllData();
    this.setPagesize();
  }

  async getAllData(){
    await this.backEnd.getUserListData().subscribe((res) => {
      this.usersData = res["data"];
      console.log("data",this.usersData);
      this.dataSource = new MatTableDataSource(this.usersData);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
    });
  }

  navigateAdd(){
    this.router.navigate(["/home/useradd"])
  }

  navigate(data) {
    this.router.navigate(["home/useradd/" + data.userId]);
  }

  search() {
    if (this.firstName || this.email || this.userId || this.phoneNumber) {

      let payload = {
        firstName: this.firstName,
        email: this.email,
        userId:this.userId,
        phoneNumber:this.phoneNumber
      };

      this.backEnd.search(payload).subscribe((res) => {
        console.log("return data is here",res);
        this.usersData = res["data"];
        this.dataSource = new MatTableDataSource(this.usersData);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        return;
      });
    } else {
       this.snackBar.open("Please provide an input", "Ok");
      return;
    }
  }

  reset(){
    this.firstName = "";
    this.email = "";
    this.userId = "";
    this.phoneNumber = "";
    this.getAllData();

  }


  setPagesize() {
   this.pageSize =  10;
  }
  onchangePagesize(data) {
    this.setPagesize();
  }


  onListDrop(event: CdkDragDrop<string[]>) {
    // Swap the elements around
    console.log(`Moving item from ${event.previousIndex} to index ${event.currentIndex}`)
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    console.log(`event.container ${event.container.data}`)
    this.dataSource.data = clonedeep(this.dataSource.data);
  }


  // drop(event: CdkDragDrop<String[]>) {
  //   const previousIndex = this.dataSource.data.findIndex(row => row === event.item.data);
  //   moveItemInArray(this.dataSource.data,previousIndex, event.currentIndex);
  //   this.dataSource.data = this.dataSource.data.slice();
  // }

}






