import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { ContentService } from 'src/app/services/content.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TokenService } from 'src/app/services/token.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { LogoutComponent } from '../modal/logout/logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  image: any;
  currentUser: any;
  theme: any;

  constructor(public generalService: GeneralService,
    private auth: AuthAdminService,
    private router: Router,
    private dialogRef: MatDialog,
    private token: TokenService,
    private contentService: ContentService,
    private themeService: ThemeService,
    private toastr: ToastrService,){}

  ngOnInit(): void {
    this.getImage();
    this.getCurrentUser();
    this.theme = this.themeService.getTheme()
  }

  getImage(){
    this.image = this.contentService.getContent().subscribe(content => {
      this.image = content.data[0]
    })
  }
  getCurrentUser(){
    this.currentUser = this.token.adminMe().subscribe({
      next: user => this.currentUser = user,
      error: err => {
        if(err.error.message == 'Unauthenticated.'){
          this.token.remove()
          this.toastr.warning("Session Expired!");
          location.reload()
        }
      }
    })
  }

  openLogoutDialog(){ // change this when build interface
    this.dialogRef.open(LogoutComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      titleData: this.currentUser,
    }})
  }


}
