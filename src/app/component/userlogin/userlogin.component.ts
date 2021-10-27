import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private fb: FormBuilder,
             private backend:BackendService
    ) { }

  ngOnInit(): void {
    this._loginForm();

  }

  _loginForm(){
    this.loginForm=this.fb.group({
      email:"",
      password:"",
    })
  }

  onSubmit(payload){
    this.backend.login(payload).subscribe(res=>{

      console.log("Respose for login",res);
      console.log("Respose for login",res['data'].token);
      let token=res['data'].token;
      localStorage.setItem("token",token);

    })

    console.log("payload",payload);
  }

}
