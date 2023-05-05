import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';
import { ReviseService } from 'src/app/services/revise.service';
import { UrlService } from 'src/app/services/url.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-add-revised',
  templateUrl: './add-revised.component.html',
  styleUrls: ['./add-revised.component.scss']
})

export class AddRevisedComponent {
  result: any;
  showComment:boolean = false;
  status: string = '0';
  capsuleId: any;
  selectedCapsuleData: any = null;
  showDiv = false;
  holderObs : any;
  
  loading: boolean = false
  public form = {
    description: '',
  }

  file: any;

  constructor(
    public generalService: GeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private capsuleService: CapsuleService,
    private dialogRef: MatDialogRef<AddRevisedComponent>,
    private activatedRoute: ActivatedRoute,
    public urlService: UrlService,
    private reviseService: ReviseService,
    private toastr: ToastrService,
  ){}
  
  
  onSubmit(){
    let formData = new FormData();
    formData.append("description", this.form.description);
    formData.append("file_path", this.file);

    this.holderObs=this.reviseService.addCapsuleRevision(formData, this.capsuleId).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.dialogRef.close();
    console.log(data)
    this.toastr.success("Added Successfully!");
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
