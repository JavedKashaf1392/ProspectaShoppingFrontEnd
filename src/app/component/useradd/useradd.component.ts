import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';
import { FileuploadService } from 'src/app/services/fileupload/fileupload.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss']
})
export class UseraddComponent implements OnInit {
  roleList: any = [];

  fileList: File[] = [];
  listOfFiles: any[] = [];
  urlList: any[] = [];
  @ViewChild("attachments") attachment: any;

  filedata: File;
  formDocsList = [];
  pageStatus = true;

  selectedRole;
  selectedRoleName: string = "";
  photos:any;
  image:File;
  email;
  firstName;
  lastName;
  phoneNumber;
  flag:boolean=true;
  id: any;
  enabled: boolean = true;
  password:any;
  filenamepattern = /^[^\/:*?"<>|#{}%~&']+$/;
  applicationForm: any = {};
  imageExist: boolean;
  imageshow: string | ArrayBuffer;
  photoName: any;

  constructor(
    private router:Router,
    private backEnd:BackendService,
    private aRoute:ActivatedRoute,
    private fileuploadService:FileuploadService
  ) { }

  ngOnInit(): void {
    this.getAllRoles()
    this.selectedRole = 1;
    this.selectedRoleName = "Admin";
    let userId=this.aRoute.snapshot.params["userId"];
    this.id=userId;
    if(userId){
      this.getUserDetails(this.id);
    }
  }



  async getUserDetails(userId){
      await this.backEnd.getUser(userId).subscribe((res) => {

        if (res) {
          console.log("Response",res);
          let user = res["data"];
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.phoneNumber = user.phoneNumber;
          this.email = user.email.replace("@gmail.com", "");
          this.selectedRole = user.roles.id;
          this.selectedRoleName = user.roles.name;
          this.enabled = user.enabled;
        }
      });
    }


  onBack(){
  this.router.navigate(["/home/userlist"]);
  }

   // on Cancel button click
   onCancel() {
    this.router.navigate(["/home/userlist"]);
  }

  async onFetch(){
    if(!this.email){
      this.flag=false;
      return;
    }

    let email=this.email.trim();
    if(email.indexOf("@gmail.com") < 0){
      email=this.email + "@gmail.com";
    }try{
     email=email;
    const res: any = await this.backEnd.fetchUser(email).toPromise();
    console.log("Response fetch",res);
    let emailval=res.email;
    let val2 = emailval.split('@')[0];
    console.log("value2",val2);
    this.firstName=res.firstName;
    this.lastName=res.lastName;
    this.phoneNumber=res.phoneNumber;
    this.enabled=res.enabled;
    this.selectedRoleName=res.roles[0]?.name;
    console.log("Selected Roles",this.selectedRoleName)
    }catch(err){
      this.flag = false;
      console.error(err);
      this.backEnd.openSnackBar("User not found. Please provide correct email id", "warning");
      this.firstName = "";
      this.lastName = "";
      this.phoneNumber = "";
      this.id = "";
      this.email="";
    }
  }

  async getAllRoles(){
    this.backEnd.AllRoles().subscribe(
      data=>{
    this.roleList=data
    console.log("data",this.roleList);
      },error=>{
        console.log(error);
      }
    )
  }


    // onRoleSelected
    onRoleSelected(value) {
      if (value) {
        this.selectedRole = value;
        let filtered = this.roleList.filter((v) => v.id === value);
        this.selectedRoleName = filtered.length > 0 ? filtered[0].name : this.selectedRoleName;
      }
    }


  async saveUser() {

    let formdata = new FormData();
    this.photoName = uuid();

    if (this.firstName.trim().length === 0) {
      this.backEnd.openSnackBar("Please click on the Fetch button and try again");
      return;
    }

    if (this.flag === false) {
      this.backEnd.openSnackBar("Please click on the Fetch button and try again");
      return;
    }

    let payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email +"@gmail.com",
      phoneNumber:this.phoneNumber,
      enabled:this.enabled,
      password:this.password,
      id:this.id,
      photos:this.image.name,
      roles:[ {
      id: this.selectedRole,
      name: this.selectedRoleName
      },
      ]
    }

    if(this.image?.size > 0){
      this.backEnd.uploadImage(this.image,payload).subscribe((res) => {
        this.backEnd.openSnackBar(res['message'], "success");
      });
    }
    }


    photoUpload(image) {
      if (image.target.files && image.target.files[0]) {
        this.imageExist=true;
        this.image=image.target.files[0]
        const file = image.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.imageshow = reader.result;
        reader.readAsDataURL(file);
    }
    }
}
