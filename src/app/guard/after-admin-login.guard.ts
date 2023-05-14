import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

export namespace AfterAdminLoginGuard {

  export const canActivate = (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ) => {
    const token = inject(TokenService)
    const router = inject(Router)
    const tokenData = token.get();
    let role = ''
    if(tokenData){ role = tokenData.role }

    if (token.loggedIn()){
      if(role === 'admin'){
        return token.loggedIn()
      }else if (role === 'faculty'){
        router.navigate(['faculty']);
        return false;
      }else{ return false; }
    } else {
      router.navigate(['admin/login']);
      return false;
    }
  }
}
