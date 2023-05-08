import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-faculty-reset-password',
  templateUrl: './faculty-reset-password.component.html',
  styleUrls: ['./faculty-reset-password.component.scss']
})
export class FacultyResetPasswordComponent {
  myModel = {
    email: '',
  };

  public data = {
    token: '',
    role: ''
  }
  loading: boolean = false
  public error = null

  constructor(private adminAuth: AuthAdminService,
    private token: TokenService,
    private router: Router,
    private toastr: ToastrService) {}

  onSubmit(){
    this.loading = true
    this.adminAuth.sendPasswordResetLink(this.myModel).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }
  handleError(error: any){
    this.error = error.error.error;
    if(error.message){
      this.toastr.warning(error.message);
    } else{
      this.toastr.warning(error.error.error);
    }
    this.loading = false;
    setTimeout(() => {
      this.error = null
    }, 5000);
  }

  handleResponse(data: any){
    this.myModel.email = ""
    this.loading = false;
    this.toastr.success("Please check your gmail for the link!");
    this.router.navigateByUrl('/faculty/login');
  }
}
