import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

export namespace AfterFacultyLoginGuard {

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
      return token.loggedIn()
    } else {
      router.navigate(['faculty/login']);
      return false;
    }

  }
}
