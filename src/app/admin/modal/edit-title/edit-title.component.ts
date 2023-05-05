import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RubricService } from 'src/app/services/rubric.service';

@Component({
  selector: 'app-edit-title',
  templateUrl: './edit-title.component.html',
  styleUrls: ['./edit-title.component.scss']
})
export class EditTitleComponent implements OnInit{

  result: any;
  loading: boolean = false
  public form = {
    title: null,
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private rubricService: RubricService,
    private dialogRef: MatDialogRef<EditTitleComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data;
    this.form.title = this.data.titleData.title
  }

  onSubmit(){
    this.loading = true
    this.rubricService.editCategory(this.form, this.result.titleData.id).subscribe({
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
