import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BackendService } from 'src/app/services/backend/backend.service';
import { GenericService } from 'src/app/services/generic/generic.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {


  loginForm: any;
  public showLoading:boolean;
  public subscription:Subscription[]=[];

  constructor(private fb:FormBuilder ,private router:Router,private generic:GenericService,private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onLogin(){
    let obj = this.loginForm.value
    console.log(obj)
    this.auth.LoginUser(obj).subscribe((
      response)=>{
        if(response){

          console.log("Response",response);
          localStorage.setItem('currentUser',response['user'].email);
          console.log("See Your Token In Login"+response);
          this.generic.token=response['token'];
          localStorage.setItem('token',this.generic.token);
          // console.log(response);
          this.router.navigate(['/home/userlist']);
        }
      }
      )
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
   }

}
