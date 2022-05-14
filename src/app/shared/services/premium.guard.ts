import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PremiumGuard implements CanActivate {
  
  constructor(private router: Router) {};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const premium = JSON.parse(localStorage.getItem('premium') as string);
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (user && premium) {
        return true;
      }
      return this.router.parseUrl('/main');
  }
  
}
