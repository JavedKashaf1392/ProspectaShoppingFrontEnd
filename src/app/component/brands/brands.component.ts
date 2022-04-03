import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import { GenericService } from 'src/app/services/generic/generic.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  BrandName:any;
  AliasName:any;
  Enabled:any;
  Brandlist:any;
  BrandlistLength:any;
  BrandListData:any;
  tempLength: any;
  brandListItems: any[];


  displayedColumns: string[] = ["name","alias","enabled","image","action","categories"];
  object:any;

  dataSource;
  pageSize;
  imageUrls: any;
  categorylist: any;
  categorylistLength: any;
  brandId: any;


  constructor(private backend:BackendService,private generic:GenericService,
    private domSanitizer:DomSanitizer,private router:Router,private aRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.getAllBrands();
  }

  getAllBrands(){
    this.backend.getAllBrands().subscribe(res=>{
      this.Brandlist = res['data'];
      this.generic.Brandlist=this.Brandlist;
      this.BrandlistLength = this.Brandlist.length;
      this.getOneCategory();
    })
  }

  getOneCategory() {
    if (this.generic.Brandlist) {
      this.BrandListData=this.generic.Brandlist;
      this.tempLength=this.generic.Brandlist.length;
      this.brandListItems=[];

      this.BrandListData.forEach(async element => {
        console.log("brand list",element);
        await this.backend.getImage(element.logo).subscribe(async (res) => {
          let objectURL = URL.createObjectURL(res);
          this.imageUrls = this.domSanitizer.bypassSecurityTrustUrl(objectURL);
          this.object = {
            id:element.id,
            name:element.name,
            alias:element.brandAlias,
            enabled:element.enabled,
            image: this.imageUrls,
            categories:element.categories

          };
          this.brandListItems.push(this.object);
          this.dataSource = new MatTableDataSource(this.brandListItems);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    }
  }

  search(){

  }

  navigateAdd(){
    this.router.navigate(['/home/addbrand']);
  }
  reset(){
  }

  setPagesize() {
    this.pageSize =  10;
   }
   onchangePagesize(data) {
     this.setPagesize();
   }

   navigate(data){
    this.router.navigate(["home/addbrand/" + data.id]);
   }

   deleteBrand(data){
     this.backend.deleteBrand(data.id).subscribe(res=>{
       console.log("res",res);
     })
   }

   addNewBrand(){

   }



}
