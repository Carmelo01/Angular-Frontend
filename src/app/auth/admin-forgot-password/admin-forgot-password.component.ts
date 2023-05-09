import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-forgot-password',
  templateUrl: './admin-forgot-password.component.html',
  styleUrls: ['./admin-forgot-password.component.scss']
})
export class AdminForgotPasswordComponent {
  form = {
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
        this.form.resetToken = params['token']
      })
    }

  onSubmit(){
    this.loading = true
    this.adminAuth.forgotPasswordAdmin(this.form).subscribe({
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
    this.router.navigateByUrl('/admin/login');
  }

}
