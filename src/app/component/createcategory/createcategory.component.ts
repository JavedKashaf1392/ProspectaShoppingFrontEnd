import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.scss']
})
export class CreatecategoryComponent implements OnInit {

  message : any;
  categorylist :any;
  CategoryForm:FormGroup;
  image:File;

  imageExist:boolean=false;
  imageshow: any;
  id: any;
  imageName: any;
  obj: {};
  // categoryForm:Category=new Category();
  constructor(private fb:FormBuilder,private backend:BackendService,private domSanitizer:DomSanitizer,
    private router:Router,private snackbar:MatSnackBar,private aRoute:ActivatedRoute) { }

    durationInSeconds = 5;

  ngOnInit(): void {
    this._buildForm();
    let categoryId=this.aRoute.snapshot.params["id"];
    if(categoryId){
      this.id=categoryId
      this.getCategoryDetails(this.id);
      this._buildForm();


    }

    this.ListCategoryForms();
  }


  _buildForm(){
    this.CategoryForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      alias:['',Validators.required],
      enabled:['',Validators.required],
      parent:['',Validators.required],
    })
  }

  getCategoryDetails(id) {
    this.backend.getCategory(id).subscribe(res=>{
      this.patchData(res);
  })
  }


  patchData(res) {
     let obj = res["data"];
   console.log("res",obj);
  //  this.CategoryForm;
  let data
    console.log("inside null values chekcing"+obj.parent);
      console.log(obj);
      if(obj.parent===null){
        data=obj.parent;
        console.log("inside null values chekcing"+data)
      }else{
        data=obj.parent.id
        console.log("inside the patchDAta:::"+data)
      }
      this.CategoryForm['controls']['id'].patchValue(obj.id);
      this.CategoryForm['controls']['name'].patchValue(obj.name);
      this.CategoryForm['controls']['alias'].patchValue(obj.alias);
      this.CategoryForm['controls']['enabled'].patchValue(obj.enabled);
      this.CategoryForm['controls']['parent'].patchValue(data);
      this.imageName=obj.image;

     if(obj){
      this.backend.getImage(obj.image).subscribe((res) => {
        if (res) {
          this.imageExist=true;
          console.log("response",res);
          let objectURL = URL.createObjectURL(res);
          console.log("object checking",objectURL);
          this.imageshow = this.domSanitizer.bypassSecurityTrustUrl(objectURL);
        }
      })}




  }
  ListCategoryForms(){
    this.backend.getAllCategoriesForms().subscribe(
      data=>{
        this.categorylist=data;
        console.log(data);
      },error=>{
        console.log(error);
      }
    )
  }

  saveCategory(){
    console.log("form data",this.CategoryForm.value);
   if(this.id){
     this.obj={
    id:this.id,
    name:this.CategoryForm.value.name,
    alias:this.CategoryForm.value.alias,
    enabled:this.CategoryForm.value.enabled,
    parent:this.CategoryForm.value.parent,
  }
  }else{
    this.obj=this.CategoryForm.value;
  }
    this.CategoryForm.reset();
    if(this.image?.size > 0){
      this.backend.saveCategory(this.image,this.obj).subscribe(
        data =>{
         this.message=data;
          this.ListCategoryForms();
         this.snackbar.open(data,'',{
           duration:5000,
           verticalPosition:'bottom'
         })
        },error =>{
         console.log(error);
        }
      );
    }else{
      this.backend.saveCategory(null,this.obj).subscribe(
        data =>{
         this.message=data;
          this.ListCategoryForms();
         this.snackbar.open(data,'',{
           duration:5000,
           verticalPosition:'bottom'
         })
        },error =>{
         console.log(error);
        }
      );
    }
    // this.backEnd.saveCategory(obj).subscribe(
    //   data =>{
    //    this.message=data;
    //    console.log(data);
    //     this.ListCategoryForms();
    //     console.log('save data is here'+data);
    //    this.snackbar.open(data,'',{
    //      duration:5000,
    //      verticalPosition:'bottom'
    //    })
    //   },error =>{
    //    console.log(error);
    //   }
    // );
  }


  onBack(){
    this.router.navigate(['home/categorylist'])
  }

  onCancel(){

  }

  // saveCategory(){

  // }

  photoUpload(image){
    if (image.target.files && image.target.files[0]) {
      this.imageExist=true;
      this.image=image.target.files[0]
      const file = image.target.files[0];
      this.imageName=image.target.files[0].name;
      const reader = new FileReader();
      reader.onload = e => this.imageshow = reader.result;
      reader.readAsDataURL(file);
  }

  }

}
