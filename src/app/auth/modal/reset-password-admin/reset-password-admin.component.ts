import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';

@Component({
  selector: 'app-reset-password-admin',
  templateUrl: './reset-password-admin.component.html',
  styleUrls: ['./reset-password-admin.component.scss']
})
export class ResetPasswordAdminComponent {
  result: any;
  loading: boolean = false
  public form = {
    email: '',
  }
  public error = null

  constructor(private dialogRef: MatDialogRef<ResetPasswordAdminComponent>,
    private adminService: AuthAdminService,
    private toastr: ToastrService,
    private router: Router) {}

  onSubmit(){
    this.loading = true
    this.adminService.sendAdminPasswordResetLink(this.form).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.form.email = ""
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success("Please check your gmail for the link!");
    this.router.navigateByUrl('/admin/login');
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
}
