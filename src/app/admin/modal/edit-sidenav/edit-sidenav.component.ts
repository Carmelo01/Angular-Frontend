import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-edit-sidenav',
  templateUrl: './edit-sidenav.component.html',
  styleUrls: ['./edit-sidenav.component.scss']
})
export class EditSidenavComponent {
  result: any;
  loading: boolean = false

  imgChangeEvt:any='';
  cropImgPreview:any='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditSidenavComponent>,
    private toastr: ToastrService,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.result = this.data;
  }

  onFileChange(event: any){
    this.imgChangeEvt = event;
  }

  cropImg(e: ImageCroppedEvent){
    this.cropImgPreview = e.base64;
  }

  onSubmit(){
    let data = {
      cictLogo: this.cropImgPreview
    }
    this.loading = true
    this.contentService.editLogo(data, this.result.content.id).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    console.log(data);
    this.toastr.success("Update Successfully!");
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
