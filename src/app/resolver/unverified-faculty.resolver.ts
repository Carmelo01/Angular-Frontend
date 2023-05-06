import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FacultyService } from '../services/faculty.service';

@Injectable({
  providedIn: 'root'
})
export class UnverifiedFacultyResolver implements Resolve<boolean> {
  constructor(private facultyService: FacultyService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.facultyService.allUnverified();
  }
}