import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { BackendService } from 'src/app/services/backend/backend.service';
import { FileuploadService } from 'src/app/services/fileupload/fileupload.service';
import { take, takeUntil } from 'rxjs/operators';
import { Bank, BANKS } from './demo-data';
import { MatSelect } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.scss'],

})
export class AddbrandComponent implements OnInit {

  Brandform: FormGroup;

  categorylist: any=[];
  protected banks: Bank[] = this.categorylist;

   public categorylistArray: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  public categoryFilterCtrl: FormControl = new FormControl();

  public selecteCategory: FormControl = new FormControl([1]);

  protected _onDestroy = new Subject<void>();

  public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);

  public tooltipMessage = 'Select All / Unselect All';

  color: ThemePalette = 'accent';

  photos:any;
  image:File;
  // enabled: boolean = true;
  imageExist: boolean =false;
  imageshow: any;
  photoName: any;
  imageUrl: File;
  fileName: string;
  categories: any=[];
  message: any;
  brandId: any;
  res1: any;
  brandArray:FormArray;
  brandArrayForm:FormArray;


  constructor(
    private router:Router,
    private backend:BackendService,
    private aRoute:ActivatedRoute,
    private fileuploadService:FileuploadService,
    private fb:FormBuilder,
    private domSanitizer:DomSanitizer,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {

   }

  async ngOnInit(): Promise<void> {
    let id=this.aRoute.snapshot.params["brandId"];
    this.brandId=id;
    if(id){
      console.log("brand Id",id);
     this.getBrand(id);
    }

      this.getAllCategories();
       this.AddBrandRegistration();
  }

  getBrand(id){
    this.backend.getOneBrand(id).subscribe(async res=>{
      console.log("Response",res['data']);
       this.res1=res['data'].name;
       this.Brandform["controls"]["name"].patchValue(res['data'].name);
       this.Brandform["controls"]["BrandAlias"].patchValue(res['data'].brandAlias);
       this.Brandform["controls"]["enabled"].patchValue(res['data'].enabled);
       this.Brandform["controls"]["id"].patchValue(res['data'].id);
       if(res['data'].mainBrand.length > 0){
         res['data'].mainBrand.forEach((ele,i)=>{
          this.addBranchData(ele,i);
         })
       }
       if(res['data']){
        this.fileName=res['data'].logo;
        await this.backend.getImage(this.fileName).subscribe((res) => {
          this.imageExist = true;
          let objectURL = URL.createObjectURL(res);
          this.imageshow = this.domSanitizer.bypassSecurityTrustUrl(objectURL);
        });
       }






      // console.log("aa",res['data'].categories);
      // if(res['data'].categories){
      //   this.categorylistArray = new ReplaySubject<[]>(1);
      //   this.categorylistArray.next(res['data'].categories.slice());
      //   console.log("this.categorylistArray",this.categorylistArray);
      //   this.Brandform["controls"]["selecteCategory"].patchValue(this.categorylistArray);
      // }


      // if(res['data'].categories){
      //   res['data'].categories.forEach((el,i)=>{
      //      this.Brandform["controls"]["selecteCategory"].patchValue(el);
      //   })
      // }
    })
  }



  addBranchData(data?, i?) {
    this.brandArray = this.Brandform.controls['brandArray'] as FormArray;
    this.brandArray.push(this.addBrandForm());
    if(data){
      this.brandArray.at(i)?.patchValue({
        id:data.id? data.id : [''],
        brandName:data.brandName? data.brandName : [''],
        brandAlias:data.brandAlias? data.brandAlias : [''],
        categoryName:data.categoryName? data.categoryName : [''],
        picture:data.enabled? data.enabled : [''],
        brandActive:data.picture? data.picture : [''],
      })
    }
  }

  AddBrandRegistration() {
    console.log("inside the brand")
    this.Brandform = this.fb.group({
      id:[""],
      name:[""],
      BrandAlias: [""],
      enabled:true,
      selecteCategory: [null,Validators.required],
      brandArray:this.fb.array([])
    });
  }

  addBrandForm():FormGroup {
    return this.fb.group({
     id:[''],
     brandName:[''],
     brandAlias:[''],
     categoryName:[''],
     picture:[''],
     brandActive:['']
    })
  }


  AddBrands(){
    console.log("brands data",this.Brandform.value);
    if(!this.brandId){
      this.SaveBrands();
    }
    if(this.brandId){
     this.UpdateBrands();
    }

  }

  SaveBrands(){
    this.categories=[];
    let raw = this.Brandform.value;
    raw.selecteCategory.forEach(element=>{
      console.log("element",element);
      let object={
        id:element
      }
      this.categories.push(object);
    })
    let obj={
      id : raw.id,
      name : raw.name,
      brandAlias : raw.BrandAlias,
      enabled : raw.enabled,
      logo:this.fileName,
      categories:this.categories,
      mainBrand:raw.brandArray
    }
    if(this.image?.size > 0){
      let formdata = new FormData();

      formdata.append("file",this.image);
      this.backend.uploadImage1(formdata).subscribe((res) => {
      });
      this.backend.saveBrand(obj).subscribe(data =>{
         this.message=data;
         console.log("message response",this.message);
        },error =>{
         console.log(error);
        }
      );
    }
  }




  UpdateBrands(){
    console.log("update is done")
    this.categories=[];
    let raw = this.Brandform.value;
    raw.selecteCategory.forEach(element=>{
      console.log("element",element);
      let object={
        id:element
      }
      this.categories.push(object);
    })
    let obj={
      id : raw.id,
      name : raw.name,
      brandAlias : raw.BrandAlias,
      enabled : raw.enabled,
      logo:this.fileName ? this.fileName : this.res1.logo,
      categories:this.categories,
      mainBrand:raw.brandArray
    }
    if(this.image?.size > 0){
      let formdata = new FormData();
      formdata.append("file",this.image);
      this.backend.uploadImage1(formdata).subscribe((res) => {
      });
    }
      this.backend.updateBrand(obj).subscribe(data =>{
         this.message=data;
         console.log("message response",this.message);
        },error =>{
         console.log(error);
        }
      );
    }


    async getAllCategories(){
    await this.backend.getAllCategoriesForms1().subscribe((res)=>{
      this.categorylist=res;
      this.selecteCategory = res;
      this.categorylistArray = new ReplaySubject<[]>(1);
      this.categorylistArray.next(this.categorylist.slice());
        this.categoryFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
           this.filterSupplyDetails();
       });
        });

    }


    filterSupplyDetails() {
      if (!this.categorylist) {
        return;
      }
      // get the search keyword
      let search = this.categoryFilterCtrl.value;
      if (!search) {
        this.categorylistArray.next(this.categorylist.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the banks
      this.categorylistArray.next(
        this.categorylist.filter((bank) => bank.name.toLowerCase().indexOf(search) > -1)
      );
    }



  onBack(){
  this.router.navigate(["/home/userlist"]);
  }

   // on Cancel button click
   onCancel() {
    this.router.navigate(["/home/userlist"]);
  }

    handleFileInput(image) {
      if (image.target.files && image.target.files[0]) {
        this.imageExist=true;
        this.image=image.target.files[0]
        this.fileName=image.target.files[0].name
        const file = image.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageshow = reader.result;
        reader.readAsDataURL(file);
    }
    }

    brandsList(){
      this.router.navigate(['/home/brandlist'])
    }

    deleteBranch(i,item){
      this.brandArray = this.Brandform.controls['brandArray'] as FormArray;
      this.brandArray.removeAt(i);
      this.AddBrands();
      // this.AddBrandRegistration();
      // this.changeDetectorRef.markForCheck();
    }












    //search is here

    toggleSelectAll(selectAllValue: boolean) {

      console.log("data",selectAllValue);
      this.filteredBanksMulti.pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(val => {
          if (selectAllValue) {
            this.selecteCategory.patchValue(val);
          } else {
            this.selecteCategory.patchValue([]);
          }
        });
    }

    ngOnDestroy() {
      this._onDestroy.next();
      this._onDestroy.complete();
    }


        addNewBrand(){
        this.brandArray = this.Brandform.get('brandArray') as FormArray;
        this.brandArray.push(this.addBrandForm());
      }

}




