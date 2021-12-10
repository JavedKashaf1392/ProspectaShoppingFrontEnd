import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  // categoryForm:Category=new Category();
  constructor(private fb:FormBuilder,private backEnd:BackendService,
    private router:Router,private snackbar:MatSnackBar) { }

    durationInSeconds = 5;

  ngOnInit(): void {
    this.CategoryForm = this.fb.group({
      name:['',Validators.required],
      alias:['',Validators.required],
      image:['',Validators.required],
      // enabled:['',Validators.required],
      parent:['',Validators.required],
    })
    this.ListCategoryForms();
  }
  ListCategoryForms(){
    this.backEnd.getAllCategoriesForms().subscribe(
      data=>{
        this.categorylist=data;
        console.log(data);
      },error=>{
        console.log(error);
      }
    )
  }

  saveCategory(){
    let obj=this.CategoryForm.value;
    this.CategoryForm.reset();
    this.backEnd.saveCategory(obj).subscribe(
      data =>{
       this.message=data;
       console.log(data);
        this.ListCategoryForms();
        console.log('save data is here'+data);
       this.snackbar.open(data,'',{
         duration:5000,
         verticalPosition:'bottom'
       })
      },error =>{
       console.log(error);
      }
    );
  }

}
