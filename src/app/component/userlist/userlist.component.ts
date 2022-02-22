import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import  clonedeep from 'lodash.clonedeep';
import { DomSanitizer } from '@angular/platform-browser';
import { GenericService } from 'src/app/services/generic/generic.service';
import { environment } from 'src/environments/environment';

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
    "email",
    "firstName",
    "lastName",
    "phoneNumber",
    "roles",
    "enabled"
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
  photos1: string="jonathon-dorofy-Qne1wCsWfUA-unsplash.jpg";
  imageshow: any;
  imageUrls: any[];
  photoPath:any = environment.properties.path;

  constructor(
    private router: Router,
    private backEnd:BackendService,
    private snackBar: MatSnackBar,
    public domSanitizer: DomSanitizer,
    public generic:GenericService,

    )
    { }

  ngOnInit(): void {
    this.getAllData();
    this.setPagesize();
    this.initializePhotoList();
    this.imageUrls = [0];
    this.getImage(this.photos1);
    // console.log("envirment",this.photoUrl);

  }


  async initializePhotoList() {
    let list = await this.backEnd.getAllphotos().toPromise();
    this.generic.imageList = list;
    this.getOnePhoto();
  }




   //getting the templates
   getOnePhoto() {
    this.imageUrls = [];
    if (this.generic.imageList) {
      for (let index = 0; index < this.generic.imageList.length; index++) {


        this.backEnd.getImage(this.generic.imageList[index].name).subscribe((res) => {


          let photo:any={}
          // photo[this.generic.imageList[index].name] = res;
          let objectURL = URL.createObjectURL(res);

          // console.log("image one list",objectURL);
          let photoUrl = this.domSanitizer.bypassSecurityTrustUrl(objectURL)
          this.imageUrls[index] = photoUrl;
           photo[this.generic.imageList[index].name] = photoUrl;
          console.log("ImageResponse all",this.imageUrls[index]);
        })
      }
    }
  }



  async getAllData(){
    await this.backEnd.getUserListData().subscribe((res) => {
      console.log("userlist",res);
      if(res['success']==true){
        this.usersData = res["data"];

        // console.log("Response all",res);
        // console.log("data",this.usersData);
        this.dataSource = new MatTableDataSource(this.usersData);
        this.dataSource.paginator = this.paginator;
        // console.log(this.dataSource);
        this.dataSource.sort = this.sort;
      }

    });
  }

getImage(image){
  this.backEnd.getImage(image).subscribe((res) => {
    if (res) {


      let objectURL = URL.createObjectURL(res);
      console.log("ImageResponse",res);
      this.imageshow = this.domSanitizer.bypassSecurityTrustUrl(objectURL)
    }

});
}




  navigateAdd(){
    this.router.navigate(["/home/useradd"])
  }

  navigate(data) {
    this.router.navigate(["home/useradd/" + data.id]);
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
        // console.log("return data is here",res);
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
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.dataSource.data = clonedeep(this.dataSource.data);
  }


  // drop(event: CdkDragDrop<String[]>) {
  //   const previousIndex = this.dataSource.data.findIndex(row => row === event.item.data);
  //   moveItemInArray(this.dataSource.data,previousIndex, event.currentIndex);
  //   this.dataSource.data = this.dataSource.data.slice();
  // }

}






