import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { BackendService } from '../backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationguardGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService,private router:Router,private backEnd:BackendService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn():boolean{
    if(localStorage.getItem('token')){
      return true;
    }
    this.router.navigate(['/login']);
    this.backEnd.openSnackBar("Please Login Again ! You are not allowed to click here ");
    return false;
  }

}
