import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-creatuser',
  templateUrl: './creatuser.component.html',
  styleUrls: ['./creatuser.component.scss']
})
export class CreatuserComponent implements OnInit {


  roles1:any;



  // {"id":"","firstName":"hyder","lastName":"Ali ","email":"hyder.ali@gmail.com","password":"hyder","photos":"hyder","roles":[{"id":1,"name":"Admin","description":"manage everything"}]}

public RegisterForm:any;
public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private fb:FormBuilder, private router: Router,
    public backEnd:BackendService
              ) {}

              ngOnInit(): void {
                this.RegisterForm = this.fb.group({
                  id:['',Validators.required],
                  firstName:['',Validators.required],
                  lastName:['',Validators.required],
                  email:['',Validators.required],
                  password:['',Validators.required],
                  photos:['',Validators.required],
                  roles:['',Validators.required]
                })
                this.getAllRoles();
              }


  public RegisterLogin(): void {
    let obj = this.RegisterForm.value
    console.log(JSON.stringify(obj));

    this.showLoading = true;
    this.subscriptions.push(
      this.backEnd.saveUser(obj).subscribe(
        (response) => {
      console.log("user added Successfully");
        },
        (error) => {
          console.log("error ")

        }
      )
    );
  }



  getAllRoles(){
    this.backEnd.AllRoles().subscribe(
      data=>{
     this.roles1=data
      },error=>{
        console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
