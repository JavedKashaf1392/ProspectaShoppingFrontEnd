import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getUserListData(){
    let url = `${environment.properties.baseURL}apiUserList`;
    return this.http.get(url);
  }

  // search(payload) {
  //   let url = `${environment.properties.baseURL}apiGetUserDetails?email=${payload.email || ""}&firstName=${
  //     payload.firstName || ""}?userId=${payload.userId || ""}?phoneNumber=${payload.phoneNumber || ""}`;
  //   return this.http.get(url);
  // }

  search(payload) {
    debugger;
    let url = `${environment.properties.baseURL}apiGetUserDetails?email=${payload.email || ""}&firstName=${
      payload.firstName || ""}&userId=${payload.userId || ""}&phoneNumber=${payload.phoneNumber || ""}`;
    return this.http.get(url);
  }


  getRoles() {
    let url = `${environment.properties.baseURL}apiRetriveUserRoles`;
    return this.http.get(url);
  }


  fetchUser(email) {
    if (!email ) {
      return;
    }
    let url = `${environment.properties.baseURL}apiFetchUser`;
    return this.http.post(url,email);
  }





  saveUser(payload) {
    let url = `${environment.properties.baseURL}apiSaveUser`;
    return this.http.post(url, payload);
  }


  getUser(userId) {
    let url = `${environment.properties.baseURL}apiGetUserDetails?userId=${userId}`;
    return this.http.get(url);
  }

  login(payload){
    let url=`${environment.properties.baseURL}apiLoginUser`;
    return this.http.post(url,payload);
  }


















  openSnackBar(msg, icon?, width?, template?, timeInterval?) {
    let sweetObj: any = {
      width: width || 500,
      icon: icon || "error",
      title: msg,
      html: template,
      showConfirmButton: true,
      timer: timeInterval == 0 ? 0 : 30000,
    };
    if (icon == true) {
      delete sweetObj.icon;
    }

    Swal.fire(sweetObj);
  }


  confirmBox(msg, icon?, width?, template?, timeInterval?){
    let sweetObj: any = {
      width: width || 500,
      icon: icon || "error",
      title: msg,
      html: template,
      showConfirmButton: true,
      showCancelButton:true,
      timer: timeInterval == 0 ? 0 : 30000,
    };
    if (icon == true) {
      delete sweetObj.icon;
    }
  }


}
