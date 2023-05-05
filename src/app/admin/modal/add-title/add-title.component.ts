import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RubricService } from 'src/app/services/rubric.service';

@Component({
  selector: 'app-add-title',
  templateUrl: './add-title.component.html',
  styleUrls: ['./add-title.component.scss']
})
export class AddTitleComponent {
  result: any;
  loading: boolean = false
  public form = {
    title: null,
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private rubricService: RubricService,
    private dialogRef: MatDialogRef<AddTitleComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data;
  }

  onSubmit(){
    this.loading = true
    this.rubricService.addCategory(this.form).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false
    this.dialogRef.close();
    this.toastr.success("Added Successfully!");
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false
  }
}
