import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-forgot-password-faculty',
  templateUrl: './forgot-password-faculty.component.html',
  styleUrls: ['./forgot-password-faculty.component.scss']
})
export class ForgotPasswordFacultyComponent {
  myModel = {
    email: '',
    password: '',
    password_confirmation: '',
    resetToken: ''
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
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {
      activatedRoute.queryParams.subscribe(params => {
        this.myModel.resetToken = params['token']
      })
    }

  onSubmit(){
    this.loading = true
    this.adminAuth.changePassword(this.myModel).subscribe({
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
    this.loading = false;
    console.log(data)
    this.toastr.success("Change Password Successfully!");
    this.adminAuth.changeAuthStatus(true);
    this.router.navigateByUrl('/faculty/login');
  }
}
