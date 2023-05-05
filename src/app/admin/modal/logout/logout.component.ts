import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  result: any;
  loading: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AuthAdminService,
    private dialogRef: MatDialogRef<LogoutComponent>,
    private toastr: ToastrService,
    private router: Router,
    private token: TokenService) {}

  ngOnInit(): void {
    this.result = this.data
  }
  logout(e: MouseEvent){
    e.preventDefault;
    this.loading = true
    this.token.remove();
    this.adminService.changeAuthStatus(false);
    this.adminService.logoutAdmin().subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success("Logout Successfully!");
    this.router.navigate([`/admin/login`])
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
