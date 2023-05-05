import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-edit-logo',
  templateUrl: './edit-logo.component.html',
  styleUrls: ['./edit-logo.component.scss']
})
export class EditLogoComponent {
  result: any;
  loading: boolean = false;
  isLogo: boolean = true;

  imgChangeEvt:any='';
  cropImgPreview:any='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditLogoComponent>,
    private toastr: ToastrService,
    private contentService: ContentService) {}

  ngOnInit(): void {
    this.result = this.data;
    if(this.result.type === 'logo'){
      this.isLogo = true
    } else {
      this.isLogo = false
    }
  }

  onFileChange(event: any){
    this.imgChangeEvt = event;
  }

  cropImg(e: ImageCroppedEvent){
    this.cropImgPreview = e.base64;
  }

  onSubmit(){
    let data = {
      image: this.cropImgPreview
    }

    this.loading = true
    if(this.result.type === 'logo'){
      this.contentService.editLogo(data, this.result.content.id).subscribe({
        next: data => this.handleResponse(data),
        error: error => this.handleError(error)
      })
    } else {
      this.contentService.editSideNav(data, this.result.content.id).subscribe({
        next: data => this.handleResponse(data),
        error: error => this.handleError(error)
      })
    }

  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    this.toastr.success("Update Successfully!");
    location.reload();
  }

  handleError(error: any){
    this.toastr.warning("Please make sure that the uploaded image is less than 2mb.");
    this.loading = false;
  }
}
