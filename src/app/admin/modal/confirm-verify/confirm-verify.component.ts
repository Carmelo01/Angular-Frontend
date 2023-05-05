import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FacultyService } from 'src/app/services/faculty.service';
import { RubricService } from 'src/app/services/rubric.service';

@Component({
  selector: 'app-confirm-verify',
  templateUrl: './confirm-verify.component.html',
  styleUrls: ['./confirm-verify.component.scss']
})
export class ConfirmVerifyComponent {
  result: any;
  loading: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private facultyService: FacultyService,
    private dialogRef: MatDialogRef<ConfirmVerifyComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data
  }

  verifyUser(){
    this.loading = true
    this.facultyService.verifyFaculty(this.result.userData.id).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false
    this.dialogRef.close();
    this.toastr.success(data.msg);
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false
  }
}
