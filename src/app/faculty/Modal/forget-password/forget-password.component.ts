import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  public form = {
    old_password: null,
    password: null,
    confirm_password: null
  }
  error: any;
  loading: boolean = false

  constructor(private dialogRef: MatDialogRef<ForgetPasswordComponent>,
  private facultyService: FacultyService,
  private toastr: ToastrService){}

  changePassword() {
    this.loading = true;
    if(this.form.password !== this.form.confirm_password){
      this.error = 'Password and Confirm password does not match!'
      setTimeout(() => {
        this.error = null
      }, 5000);
    } else {
      this.facultyService.changePassword(this.form).subscribe({
        next: data => this.handleResponse(data),
        error: error => this.handleError(error)
      })
    }
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success(data.msg);
    // location.reload()
    console.log(data)
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
