import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  public form = {
    email: null,
    password: null
  }
  data = {
    token: null,
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
    this.adminAuth.login(this.form).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleError(error: any){
    this.error = error.error.error;
    this.toastr.warning(error.error.error);
    this.loading = false;
    setTimeout(() => {
      this.error = null
    }, 5000);
  }

  handleResponse(data: any){
    this.data.token = data.token;
    this.data.role = 'admin';
    let themeStorage = localStorage.getItem('theme')
    if(themeStorage){
      localStorage.setItem('theme', themeStorage);
    } else {
      localStorage.setItem('theme', 'light');
    }
    this.token.handle(this.data);
    this.loading = false;
    this.toastr.success("Login Successfully!");
    this.adminAuth.changeAuthStatus(true);
    this.router.navigateByUrl('/admin/home');
  }
}
