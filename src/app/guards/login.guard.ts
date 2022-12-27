import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserauthenicationService } from '../services/userauthenication.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanActivate {
  constructor(private route:Router,private authservice:UserauthenicationService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated();
  }
  isAuthenticated()
  {
   if(this.authservice.isLoggedIn)
   {
    // console.log("1");
    // this.route.navigateByUrl('/nav')
    return true;
   }
   else
   {
    console.log("2");
    this.route.navigateByUrl('/LogInView')
    return false;
   }
   }
  }
