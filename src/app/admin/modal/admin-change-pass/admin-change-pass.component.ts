import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';

@Component({
  selector: 'app-admin-change-pass',
  templateUrl: './admin-change-pass.component.html',
  styleUrls: ['./admin-change-pass.component.scss']
})
export class AdminChangePassComponent {
  public form = {
    old_password: null,
    password: null,
    confirm_password: null
  }
  error: any;
  loading: boolean = false

  constructor(private dialogRef: MatDialogRef<AdminChangePassComponent>,
  private adminService: AuthAdminService,
  private toastr: ToastrService){}

  changePassword() {
    this.loading = true;
    if(this.form.password !== this.form.confirm_password){
      this.error = 'Password and Confirm password does not match!'
      setTimeout(() => {
        this.error = null
      }, 5000);
    } else {
      this.adminService.changePasswordAdmin(this.form).subscribe({
        next: data => this.handleResponse(data),
        error: error => this.handleError(error)
      })
    }
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success(data.msg);
    location.reload()
  }

  handleError(error: any){
    if(error.error.msg){
      this.toastr.warning(error.error.msg);
    }else{
      this.toastr.warning(error.error.error);
    }
    this.loading = false;
  }
}
