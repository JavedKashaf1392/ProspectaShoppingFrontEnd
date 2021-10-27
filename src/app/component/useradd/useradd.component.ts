import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend/backend.service';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.scss']
})
export class UseraddComponent implements OnInit {
  roleList: any = [];

  selectedRole;
  selectedRoleName: string = "";

  email;
  firstName;
  lastName;
  phoneNumber;
  flag:boolean=true;
  userId: any;
  accountStatus: boolean = true;
  password:any;

  constructor(
    private router:Router,
    private backEnd:BackendService,
    private aRoute:ActivatedRoute
  ) { }




  ngOnInit(): void {
    this.getRoleList();
    this.selectedRole = 1;
    this.selectedRoleName = "Basic User";
    let userId=this.aRoute.snapshot.params["userId"];
    this.userId=userId;
    if(userId){
      this.getUserDetails(userId);
    }
  }



  async getUserDetails(userId){
      await this.backEnd.getUser(userId).subscribe((res) => {
        if (res && res["success"] === true && res["data"].length > 0) {
          console.log("Response for UserId",res);
          let user = res["data"][0];
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.phoneNumber = user.phoneNumber;
          this.email = user.email.replace("@ingredion.com", "");
          this.selectedRole = user.accountSecurity.roleId;
          this.selectedRoleName = user.accountSecurity.roleName;
          this.accountStatus = user.accountStatus;
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

    let payload:any={};
    let email=this.email.trim();
    if(email.indexOf("@ingredion.com") < 0){
      email=this.email + "@ingredion.com";
    }try{
    payload.email=email;
    const res: any = await this.backEnd.fetchUser(payload).toPromise();
    let emailval=res.data[0].email;
    let val2 = emailval.split('@')[0];
    console.log("value2",val2);

    this.userId=res.data[0].userId;
    this.firstName=res.data[0].firstName;
    this.lastName=res.data[0].lastName;
    this.userId=res.data[0].userId;
    this.phoneNumber=res.data[0].phoneNumber;
    this.accountStatus=res.data[0]?.accountStatus;
    this.selectedRoleName=res.data[0]?.accountSecurity?.roleName;


    }catch(err){
      this.flag = false;
      console.error(err);
      this.backEnd.openSnackBar("User not found. Please provide correct email id", "warning");
      this.firstName = "";
      this.lastName = "";
      this.phoneNumber = "";
      this.userId = "";
      this.email="";
    }
  }


   // fetch role drop down list
   async getRoleList() {
    this.backEnd.getRoles().subscribe((res) => {
      if (res && res["success"] === true) {
        res["listOfRolesData"].forEach(element => {
          if(element.roleId){
            this.roleList.push(element)
          }
        });
      }
    });
  }

    // onRoleSelected
    onRoleSelected(value) {
      if (value) {
        this.selectedRole = value;
        let filtered = this.roleList.filter((v) => v.roleId === value);
        this.selectedRoleName = filtered.length > 0 ? filtered[0].roleName : this.selectedRoleName;
      }
    }


  async saveUser() {
    if (this.firstName.trim().length === 0) {
      this.backEnd.openSnackBar("Please click on the Fetch button and try again");
      return;
    }

    if (this.flag === false) {
      this.backEnd.openSnackBar("Please click on the Fetch button and try again");
      return;
    }

    let payload = {
      userId: this.userId || null,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email + "@ingredion.com",
      phoneNumber: this.phoneNumber,
      accountStatus:this.accountStatus,
      password:this.password,
      accountSecurity: {
      roleId: this.selectedRole,
      roleName: this.selectedRoleName
      },
    };

    this.backEnd.saveUser(payload).subscribe((res) => {
      this.flag = true;
      console.log("Response",res);
      // if (res && res["success"] === false) {
      //   this.backEnd.openSnackBar("User already exists.", "error");
      //   return;
      // }
      if (res && res["success"] === true) {
        this.backEnd.openSnackBar("User saved successfully", "success");
        this.onBack();
      }
    });

    }

}
