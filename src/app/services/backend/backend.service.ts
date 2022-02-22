import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/component/model/category';
import { PaymentInfo } from 'src/app/component/model/payment-info';
import { Product } from 'src/app/component/model/product';
import { Purchase } from 'src/app/component/model/purchase';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getUserListData(){
    let url = `${environment.properties.baseURL}user/all`;
    return this.http.get(url);
  }

  search(payload) {
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
    let url = `${environment.properties.baseURL}user/user/${email}`;
    console.log("email",url);
    return this.http.get(url);
  }

  getAllCategoriesForms():Observable<any>{
    return this.http.get<any>(`${environment.properties.baseURL}category/categoriesForm`)
  }

  saveCategory(file?:File,category?):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append("category",JSON.stringify(category));
    debugger;
    console.log("payload",formData);
     return this.http.post(`${environment.properties.baseURL}category/categories/save`,formData,{responseType:"text"});
   }

  saveUser(payload) {
    let url = `${environment.properties.baseURL}user/save`;
    console.log("payload",payload);
    const headers=new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post(url,payload,{headers:headers});
  }

  getUser(id) {
    let url = `${environment.properties.baseURL}user/${id}`;
    return this.http.get(url);
  }
  getImage(photos) {
    return this.http.get(`${environment.properties.baseURL}file/files/${photos}`, { responseType: 'blob'})
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.properties.baseURL}file/files`);
  }

  getAllphotos() {
    return this.http.get(`${environment.properties.baseURL}file/files`);
  }

  uploadImage(file:File,user) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append("user",JSON.stringify(user))
    console.log("payload",formData);
    return this.http.post(`${environment.properties.baseURL}file/upload`, formData,{responseType: 'json'})
  }

  AllRoles(){
    let url = `${environment.properties.baseURL}user/roles`;
    console.log("url",url);
    return this.http.get(url);
  }

  login(payload){
    let url=`${environment.properties.baseURL}apiLoginUser`;
    return this.http.post(url,payload);
  }

  // Product details
   getAllProducts(){
    return this.http.get(environment.properties.baseURL +'product/all');
  }

  deleteProduct(ids:number[]):Observable<any>{
    return this.http.delete(`${environment.properties.baseURL}product/remove/${ids}`,{responseType:'text'})
  }

  ExportPdf(id:number[]):Observable<any>{
    return this.http.get(environment.properties.baseURL +'product/pdf/'+id);
  }

  ExportExcel(id:number[]):Observable<any>{
    return this.http.get(environment.properties.baseURL +'product/customers.xlsx/'+id,{responseType:'blob'});
  }

  saveProduct(product : Product):Observable<any>{
    return this.http.post(`${environment.properties.baseURL}product/save`,product,{responseType:'text'})
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${environment.properties.baseURL}product/${id}`);
  }

  updateProduct(product : Product):Observable<any>{
    return this.http.put(`${environment.properties.baseURL}product/update`,product,{responseType:'text'});
  }

  activeAndDeactive(id:any):Observable<any> {
    return this.http.get(environment.properties.baseURL +'product/inactive/' +id,{responseType:'text'});
  }

  placeOrder(purchase:Purchase):Observable<any>{
    console.log("Purchase",purchase);
    return this.http.post<Purchase>(environment.properties.baseURL +'api/checkout/purchase',purchase);
  }

  createPaymentIntent(paymentInfo:PaymentInfo):Observable<any>{
    return this.http.post<PaymentInfo>(environment.properties.baseURL+'api/checkout/payment-intent',paymentInfo);
  }

  ///category data is here
  getCategory(id){
    return this.http.get(`${environment.properties.baseURL}category/${id}`);
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
