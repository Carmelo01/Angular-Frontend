import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';

@Component({
  selector: 'app-add-capsule',
  templateUrl: './add-capsule.component.html',
  styleUrls: ['./add-capsule.component.scss']
})
export class AddCapsuleComponent {
  result: any;
  loading: boolean = false
  public form = {
    title: '',
    description: '',
  }

  file: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddCapsuleComponent>,
    private capsuleService: CapsuleService,
    private toastr: ToastrService) {}

  getFile(event: any){
    this.result = this.data;
    this.file = event.target.files[0];
  }

  onSubmit(){
    this.loading = true
    let formData = new FormData();
    formData.append("title", this.form.title);
    formData.append("description", this.form.description);
    formData.append("file_path", this.file);

    this.capsuleService.addCapusle(formData).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success("Added Successfully!");
    this.data.oninit()
  }

  handleError(error: any){
    console.log(error)
    if(error.error.msg.file_path == 'The file path failed to upload.'){
      this.toastr.warning('Please try again. Make sure the file size is less than 2gb.')
    } else {
      this.toastr.warning(error.error.msg.file_path);
    }
    this.loading = false;

  }
}
