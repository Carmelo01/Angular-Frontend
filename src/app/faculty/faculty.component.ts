import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { slideInAnimation } from '../shared/animations/app.animation';

@Component({
  selector: 'user-app',
  template: `
  <div class="loader" ><app-loader  *ngIf="loading"></app-loader></div>
  <div class="loader-bg"  *ngIf="loading"></div>
    <div class="con">
      <faculty-header></faculty-header>

      <div class="container1" [@slideInAnimation]="o.isActivated ? o.activatedRoute : ''">
        <router-outlet #o="outlet"></router-outlet>
      </div>
    </div>

  `,
  styleUrls: ['./faculty.component.scss'],
  animations:[slideInAnimation]
})
export class FacultyComponent implements OnInit {
  loading =false
  constructor (public router: Router){
    this.router.events.subscribe(ev => {
      if(ev instanceof NavigationStart){
        this.loading = true
      }
      if(ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError){
        this.loading = false
      }
    })
  }

  ngOnInit(): void {
  }


}
