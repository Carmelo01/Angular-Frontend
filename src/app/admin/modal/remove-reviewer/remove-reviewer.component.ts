import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';

@Component({
  selector: 'app-remove-reviewer',
  templateUrl: './remove-reviewer.component.html',
  styleUrls: ['./remove-reviewer.component.scss']
})
export class RemoveReviewerComponent {
  result: any;
  loading: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private capsuleService: CapsuleService,
    private dialogRef: MatDialogRef<RemoveReviewerComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data
  }
  removeReviewer(){
    this.loading = true
    this.capsuleService.removeReviewer(this.result.reviewId).subscribe({
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
