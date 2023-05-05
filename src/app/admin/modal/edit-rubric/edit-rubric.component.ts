import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RubricService } from 'src/app/services/rubric.service';

@Component({
  selector: 'app-edit-rubric',
  templateUrl: './edit-rubric.component.html',
  styleUrls: ['./edit-rubric.component.scss']
})
export class EditRubricComponent implements OnInit{
  result: any;
  loading: boolean = false
  public form = {
    rubric: null,
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private rubricService: RubricService,
    private dialogRef: MatDialogRef<EditRubricComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data;
    this.form.rubric = this.data.titleData.rubric
  }

  onSubmit(){
    this.loading = true
    this.rubricService.editRubric(this.form, this.result.titleData.id).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false
    this.dialogRef.close();
    this.toastr.success("Edit Successfully!");
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false
  }
}
