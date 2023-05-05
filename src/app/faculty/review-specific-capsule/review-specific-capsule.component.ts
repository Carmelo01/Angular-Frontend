import { formatDate } from '@angular/common';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { UrlService } from 'src/app/services/url.service';
// import { fade } from 'src/app/shared/animations/fade.animation';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { GeneralService } from 'src/app/shared/services/general.service';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReviseService } from 'src/app/services/revise.service';
import { AddRevisedComponent } from '../Modal/add-revised/add-revised.component';
import { TokenService } from 'src/app/services/token.service';
import { RubricService } from 'src/app/services/rubric.service';
import { ExportService } from 'src/app/services/export.service';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-review-specific-capsule',
  templateUrl: './review-specific-capsule.component.html',
  styleUrls: ['./review-specific-capsule.component.scss']
})
export class ReviewSpecificCapsuleComponent {

  result: any;
  showComment:boolean = false;
  status: string = '0';
  capsuleId: any;
  selectedCapsuleData: any = null;
  showDiv = false;
  holderObs : any;
  showAllComment:boolean = false;
  comments: any[] = []
  meData: any;
  loading: boolean = false
  public form = {
    comment: null,
    role: '',
    user_id: null
  }

  file: any;
  theme: any;

  constructor(public generalService: GeneralService,
    private capsuleService: CapsuleService,
    private dialogRef: MatDialog,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private toastr: ToastrService,
    public urlService: UrlService,
    private tokenService: TokenService,
    private rubricService: RubricService,
    public exportService: ExportService
  ) {
    this.selectedCapsuleData =  this.activatedRoute.snapshot.data['capsule'].data;
  }

  getFile(event: any){
    // this.result = this.data;
    this.file = event.target.files[0];
  }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.capsuleId = param.get('id');
    });
    console.log(this.selectedCapsuleData)
    // this.getData()
    this.comments = this.selectedCapsuleData[0].comment;
    this.tokenService.me().subscribe(user => {
      this.form.role = "user"
      this.form.user_id = user.id
      this.meData = user.id
    })
    this.theme = this.themeService.getTheme()
  }

  getData(){
    this.capsuleService.getOneCapsule(this.capsuleId).subscribe(capsule => {
      this.selectedCapsuleData = capsule.data;
      this.comments = capsule.data[0].comment;
    })
  }

  exportToService(user_id: any){
    let data ={
      reviewer_id: user_id,
      capsule_id: this.capsuleId
    }
    // this.exportService.exportGradedRubric(user_id )
    this.rubricService.getGradedRubric(data).subscribe(datas => {
      this.exportService.exportGradedRubric(datas, datas);
    })
  }

  toggleComment(){
    this.showComment = !this.showComment;
  }
  toggleAllComment(){
    this.showAllComment = !this.showAllComment;
  }

  formatReqDate(dateReq: Date){
    return formatDate(dateReq, 'yyyy-MM-dd', 'en_PH')
  }

  onSubmit(){
    this.loading = true
    this.capsuleService.postComment(this.form, this.capsuleId).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  openDialog(data: any, capsule: any ){ // change this when build interface
    this.dialogRef.open(DialogComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      capsuleId: data,
      capsuleData: capsule
    }})
  }

  openAddRevisionDialog(){ // change this when build interface
    this.dialogRef.open(AddRevisedComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    // data: {
    //   oninit: () => {
    //     this.capsules = this.capsuleService.getUserCapsules().subscribe(capsule => {
    //       this.capsules = capsule;
    //     })
    //   }
    // }
  })
  }


  openPdf(data: any) {
    this.capsuleService.getFile(data.file_path).subscribe(data=>{
       // Create a blob object from the ArrayBuffer data
      const blob = new Blob([data], { type: 'application/pdf' });

      // Create a URL for the blob object
      const url = URL.createObjectURL(blob);

      // Open the URL in a new tab
      window.open(url, '_blank');
    })
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }

  handleResponse(data: any){
    this.loading = false;
    this.getData();
    this.showComment = true;
    this.form.comment = null
  }


}
