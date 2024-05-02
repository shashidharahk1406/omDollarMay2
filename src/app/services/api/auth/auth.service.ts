import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user_id:any;
  public currentUrl:any
  constructor(private router:Router) {

   }

   canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean|Observable<boolean>| Promise<boolean>
   {
    this.currentUrl = state.url;
    return this.checkUrl(this.currentUrl);
   }
   checkUrl(url:any):any{
    this.user_id = localStorage.getItem('user_id')
    // this.verify = localStorage.getItem('verification')
    if(!this.user_id ){
      this.router.navigate(['driver/outer/login'])
    }
    return true
   }

}
