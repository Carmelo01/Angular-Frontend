import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';

@Component({
  selector: 'app-edit-capsule',
  templateUrl: './edit-capsule.component.html',
  styleUrls: ['./edit-capsule.component.scss']
})
export class EditCapsuleComponent implements OnInit{
  result: any;
  loading: boolean = false
  public form = {
    title: '',
    description: '',
  }

  file: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditCapsuleComponent>,
    private capsuleService: CapsuleService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.result = this.data.capsule[0];
    this.form.title = this.data.capsule[0].title;
    this.form.description = this.data.capsule[0].description;
  }

  getFile(event: any){
    this.file = event.target.files[0];
  }

  onSubmit(){
    this.loading = true
    if(this.file == null || this.file == undefined){
      this.file = this.data.capsule[0].file_path;
    }
    let formData = new FormData();
    formData.append("title", this.form.title);
    formData.append("description", this.form.description);
    formData.append("file_path", this.file);

    this.capsuleService.editCapsule(formData, this.result.id).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success("Edit Capsule Successfully!");
    this.data.oninit()
    this.data.close()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
