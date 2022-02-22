import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class HttpintercepterInterceptor implements HttpInterceptor {
   host:string='http://localhost:8585'
   host1:string='http://localhost:3000'

  constructor(private authenticationService:AuthenticationService) { }
  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.includes(`${this.host}/user/login`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.host}/user/save`)) {
      return httpHandler.handle(httpRequest);
    }

    if (httpRequest.url.includes(`${this.host}/user/roles`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.host}/user/roles`)) {
      return httpHandler.handle(httpRequest);
    }
    if (httpRequest.url.includes(`${this.host1}/api/delivery`)) {
      return httpHandler.handle(httpRequest);
    }

    // if (httpRequest.url.includes(`${this.authenticationService.host}/category/categories`)) {
    //   return httpHandler.handle(httpRequest);
    // }


  this.authenticationService.loadToken();
  const token=this.authenticationService.getToken();
  const request=httpRequest.clone({ setHeaders: {Authorization:token}});
  return httpHandler.handle(request);
  }

}
