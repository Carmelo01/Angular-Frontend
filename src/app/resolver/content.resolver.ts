import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContentService } from '../services/content.service';

@Injectable({
  providedIn: 'root'
})
export class ContentResolver implements Resolve<boolean> {
  constructor(private contentService: ContentService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.contentService.getContent();
  }
}
