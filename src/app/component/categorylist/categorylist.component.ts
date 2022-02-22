import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import { GenericService } from 'src/app/services/generic/generic.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss']
})
export class CategorylistComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('table') table: MatTable<any>

  CategoryName:any;
  AliasName:any;
  Enabled:any;

  displayedColumns: string[] = ["name","alias","enabled","image"];
  categorylist: any;
  object:any;
  categoryItems: any;
  dataSource;
  usersData = [];
  pageSize;
  categorylistLength: any;
  categoryListData: any;
  tempLength: any;
  categoryListItems: any[];
  imageUrls: any;

  constructor(private backend:BackendService,private router:Router,
    private generic:GenericService,public domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.getAllCategories();

  }

  getAllCategories(){
    this.backend.getAllCategoriesForms().subscribe(res=>{
      // console.log("categories form data",res);
      this.categorylist=res;
      this.generic.categoryList=this.categorylist;
      this.categorylistLength = this.categorylist.length;
      this.getOneCategory();
    })
  }
  getOneCategory() {
    if (this.generic.categoryList) {
      this.categoryListData=this.generic.categoryList;
      this.tempLength=this.generic.categoryList.length;
      this.categoryListItems=[];
      this.categoryListData.forEach(async element => {
        console.log("element",element);

        // image

        await this.backend.getImage(element.image).subscribe(async (res) => {
          let objectURL = URL.createObjectURL(res);
          this.imageUrls = this.domSanitizer.bypassSecurityTrustUrl(objectURL);
          this.object = {
            id:element.id,
            name:element.name,
            alias:element.alias,
            enabled:element.enabled,
            image: this.imageUrls,
          };
          this.categoryListItems.push(this.object);
          console.log("all data is here", this.categoryListItems);
          this.dataSource = new MatTableDataSource(this.categoryListItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    }
  }

  navigateAdd(){
    this.router.navigate(['/home/createcategory']);

  }

  search(){

  }

  reset(){

  }

  onListDrop(event: CdkDragDrop<string[]>) {
    // Swap the elements around
    // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // this.dataSource.data = clonedeep(this.dataSource.data);
  }


  setPagesize() {
    this.pageSize =  10;
   }
   onchangePagesize(data) {
     this.setPagesize();
   }


   navigate(category){
     this.router.navigate(["home/createcategory/" + category.id])
   }

}
