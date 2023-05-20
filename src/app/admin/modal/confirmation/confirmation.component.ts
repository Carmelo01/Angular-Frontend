import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {
  result: any;
  loading: boolean = false
  public form = {
    comment: null
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private capsuleService: CapsuleService,
    private dialogRef: MatDialogRef<ConfirmationComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data
  }
  onSubmit(method:any){
    this.loading = true;
    if(method == 'Reconsider'){
      this.capsuleService.rejectCapsule(this.form ,this.result.capsuleId).subscribe({
        next: data => this.handleResponse(data),
        error: error => this.handleError(error)
      })
    } else if (method == 'Approve'){
      this.capsuleService.approveCapsule(this.result.capsuleId).subscribe({
        next: data => this.handleResponse(data),
        error: error => this.handleError(error)
      })
    } else if(method == 'Submit'){
      this.capsuleService.submitCapsule(this.result.capsuleId).subscribe({
        next: data => this.handleResponse(data),
        error: error => this.handleError(error)
      })
    } else {
      this.capsuleService.reviseCapsule(this.result.capsuleId).subscribe({
        next: data => this.handleResponse(data),
        error: error => this.handleError(error)
      })
    }
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success(this.result.method + " Successfully!");
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
