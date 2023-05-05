import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GeneralService } from '../shared/services/general.service';
import { slideInAnimation } from '../shared/animations/app.animation';
import { Chart } from 'angular-highcharts';
import { donutChartOptions } from '../helpers/donutChartOptions';
import { areaChartOptions } from '../helpers/areaChartOptions';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'admin-app',
  template: `
    <div class="con" >
    <div class="loader" ><app-loader  *ngIf="loading"></app-loader></div>
    <div class="loader-bg"  *ngIf="loading"></div>
      <div class="a-wrapper">
        <div class="a-header">
          <app-header ></app-header>
        </div>
        <div class="a-nav-router">
          <!-- <div class="a-nav">
            <app-side-nav ></app-side-nav>
          </div> -->
          <div *ngIf="generalService.showSideNav"
            [ngClass]="screenWidth <= 790 ? 'overlay' : ''"
            (click)="generalService.toggleSideNav()"  ></div>
          <div [ngClass]="screenWidth <= 790 ? 'mobile-sidenav' : 'a-nav'">
            <app-side-nav ></app-side-nav>
        </div>
        <div class="a-router" [@slideInAnimation]="o.isActivated ? o.activatedRoute : ''">
          <div *ngIf="screenWidth >= 790" [ngClass]="generalService.showSideNav ? 'sub-nav' : ''" ></div>
          <div [ngClass]="[generalService.showSideNav ? 'header-title' : 'header-title-collapse', screenWidth <= 790 && generalService.showSideNav ? 'header-title-mobile' : '']">
            <router-outlet #o="outlet"></router-outlet>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin.component.scss'],
  animations:[slideInAnimation]
})
export class AdminComponent implements OnInit {
  // title = 'Admin | Management';

  // donutChart = new Chart(donutChartOptions);
  // areaChart = new Chart(areaChartOptions);
  loading =false
  theme : any
  screenWidth!: number;
  constructor(public generalService: GeneralService,
    private themeService: ThemeService,
    public router: Router) {
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
    this.getScreenSize()
    if(this.screenWidth <= 790){ this.generalService.toggleSideNav() }
    this.theme = this.themeService.getTheme()
  }
  @HostListener('window:resize', ['$event'])
    getScreenSize() {
      this.screenWidth = window.innerWidth;
    }
}
