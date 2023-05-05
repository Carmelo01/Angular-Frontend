import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RubricService } from 'src/app/services/rubric.service';

@Component({
  selector: 'app-delete-title',
  templateUrl: './delete-title.component.html',
  styleUrls: ['./delete-title.component.scss']
})
export class DeleteTitleComponent implements OnInit{
  result: any;
  loading: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private rubricService: RubricService,
    private dialogRef: MatDialogRef<DeleteTitleComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data
  }
  deleteCategory(){
    this.loading = true
    this.rubricService.removeCategory(this.result.titleData.id).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false
    this.dialogRef.close();
    this.toastr.success("Deleted Successfully!");
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false
  }
}
