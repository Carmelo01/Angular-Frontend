import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-decline-faculty',
  templateUrl: './decline-faculty.component.html',
  styleUrls: ['./decline-faculty.component.scss']
})
export class DeclineFacultyComponent {
  result: any;
  loading: boolean = false
  public form = {
    comment: null
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private facultyService: FacultyService,
    private dialogRef: MatDialogRef<DeclineFacultyComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data
  }
  onSubmit(){
    this.loading = true;
    this.facultyService.declineFaculty(this.form, this.result.facultyId).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success("Declined Successfully!");
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
