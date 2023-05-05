import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

export namespace BeforeAdminLoginGuard {

  export const canActivate = (
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ) => {
    const token = inject(TokenService)
    const router = inject(Router)
    const tokenData = token.get();
    let role = ''
    if(tokenData){ role = tokenData.role }

    if (!token.loggedIn()){
      return !token.loggedIn()
    } else {
      if(role === 'admin'){
        router.navigate(['admin/home']);
        return false;
      }else if (role === 'faculty'){
        router.navigate(['faculty']);
        return false;
      }else{ return false; }
    }
  }
}
