import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FacultyService } from 'src/app/services/faculty.service';
import { TokenService } from 'src/app/services/token.service';
import { slideInAnimation } from 'src/app/shared/animations/app.animation';
import { LogoutComponent } from '../Modal/logout/logout.component';
import { error } from 'highcharts';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'faculty-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNav: boolean = false;
  currentUser: any;
  theme: any;

  constructor(private tokenService:TokenService,
    private dialogRef: MatDialog,
    private themeService: ThemeService,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
    this.me();
    this.theme = this.themeService.getTheme()
  }

  toggleNav(){
    this.showNav = !this.showNav;
  }

  hideOnClick(){
    if(this.showNav){
      this.showNav = !this.showNav;
    }
  }

  me(){
    this.currentUser=this.tokenService.me().subscribe({
      next: user => this.currentUser = user,
      error: err => {
        if(err.error.message == 'Unauthenticated.'){
          this.tokenService.remove()
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
