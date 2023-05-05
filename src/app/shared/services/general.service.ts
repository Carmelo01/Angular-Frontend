import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  showDialog: boolean = false;
  showSideNav: boolean = true;
  constructor() { }

  toggleSideNav(): void {
    this.showSideNav = !this.showSideNav;
  }
}
