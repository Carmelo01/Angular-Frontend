import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CapsuleService } from '../services/capsule.service';

@Injectable({
  providedIn: 'root'
})
export class CapsuleResolver implements Resolve<any> {

  constructor(private capsuleService: CapsuleService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.capsuleService.capsuleList();
  }
}
