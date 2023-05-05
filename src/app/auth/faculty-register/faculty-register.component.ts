import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';

@Component({
  selector: 'app-faculty-register',
  templateUrl: './faculty-register.component.html',
  styleUrls: ['./faculty-register.component.scss']
})
export class FacultyRegisterComponent {
  myModel = {
    lname: '',
    fname: '',
    mname: '',
    contact: '',
    email: '',
    password: ''
  };

  loading: boolean = false
  public error = null

  constructor(private adminAuth: AuthAdminService,
    private router: Router,
    private toastr: ToastrService){}

  onSubmit(){
    this.loading = true
    this.adminAuth.registerFaculty(this.myModel).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleError(error: any){
    this.error = error.error.message;
    this.toastr.warning(error.error.message);
    this.loading = false;
    setTimeout(() => {
      this.error = null
    }, 5000);
  }

  handleResponse(data: any){
    this.loading = false;
    this.toastr.success("Register Successfully!");
    this.router.navigateByUrl('/faculty/login');
  }
}
