import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';

@Component({
  selector: 'app-delete-capsule',
  templateUrl: './delete-capsule.component.html',
  styleUrls: ['./delete-capsule.component.scss']
})
export class DeleteCapsuleComponent {
  result: any;
  loading: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private capsuleService: CapsuleService,
    private dialogRef: MatDialogRef<DeleteCapsuleComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data.capsule[0];
  }
  deleteRubric(){
    this.loading = true
    this.capsuleService.deleteCapsule(this.result.id).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success("Deleted Successfully!");
    this.data.oninit()
    this.data.close()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
