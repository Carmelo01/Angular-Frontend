import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RubricService } from '../services/rubric.service';

@Injectable({
  providedIn: 'root'
})
export class RubricsResolver implements Resolve<boolean> {
  constructor(private rubricService: RubricService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.rubricService.getCategory();
  }
}
