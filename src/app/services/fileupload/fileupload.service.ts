import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http:HttpClient) { }


  getFileUploadSizeLimit(customeSize?) {
    return parseInt(customeSize || environment.properties.fileUploadSizeLimit);
  }


  //upload file
  uploadfile(content, filename) {

    let url = `${environment.properties.baseURL}apiFileUpload`;
    let form = new FormData();

    form.append("myfile", content, filename);
    return this.http.post(url, form,);
  }






}
