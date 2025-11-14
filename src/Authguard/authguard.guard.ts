import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private route:Router){

    
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

      if(localStorage.getItem('isLoggedIn')=== 'true' && localStorage.getItem('token')){
        return true;
      }
      else{
        this.route.navigate(["login"]);
        return false
      } 
    
  }
  
}
