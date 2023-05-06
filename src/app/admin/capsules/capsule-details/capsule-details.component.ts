import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';
import { ExportService } from 'src/app/services/export.service';
import { RubricService } from 'src/app/services/rubric.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TokenService } from 'src/app/services/token.service';
import { UrlService } from 'src/app/services/url.service';
import { fade } from 'src/app/shared/animations/fade.animation';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { GeneralService } from 'src/app/shared/services/general.service';
import { ConfirmationComponent } from '../../modal/confirmation/confirmation.component';
import { RemoveReviewerComponent } from '../../modal/remove-reviewer/remove-reviewer.component';

@Component({
  selector: 'app-capsule-details',
  templateUrl: './capsule-details.component.html',
  styleUrls: ['./capsule-details.component.scss'],
  animations: [ fade ]
})
export class CapsuleDetailsComponent implements OnInit{
  showComment:boolean = false;
  showAllComment:boolean = false;
  status: string = '0';
  capsuleId: any;
  selectedCapsuleData: any = null;
  loading: boolean = false;
  comments: any[] = []
  theme: any;
  public form = {
    comment: null,
    role: '',
    user_id: null
  }

  constructor(public generalService: GeneralService,
    private capsuleService: CapsuleService,
    private dialogRef: MatDialog,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private toastr: ToastrService,
    public exportService: ExportService,
    private rubricService: RubricService,
    public urlService: UrlService,
    private themeService: ThemeService) {
      this.selectedCapsuleData =  this.activatedRoute.snapshot.data['capsule'].data;
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.capsuleId = param.get('id');
    });
    this.comments = this.selectedCapsuleData[0].comment;
    this.tokenService.adminMe().subscribe(admin => {
      this.form.role = "admin"
      this.form.user_id = admin.id
    })
    this.theme = this.themeService.getTheme()
  }

  getData(){
    this.capsuleService.getOneCapsule(this.capsuleId).subscribe(capsule => {
      this.selectedCapsuleData = capsule.data;
      this.comments = capsule.data[0].comment;
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

  openDialog(data: any, capsule: any ){ // change this when build interface
    this.dialogRef.open(DialogComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      capsuleId: data,
      capsuleData: capsule,
      oninit: ()=>{
        this.capsuleService.getOneCapsule(this.capsuleId).subscribe(capsule => {
          this.selectedCapsuleData = capsule.data;
          this.comments = capsule.data[0].comment;
        })
        this.tokenService.adminMe().subscribe(admin => {
          this.form.role = "admin"
          this.form.user_id = admin.id
        })
      }
    }})
  }

  openConfirmationDialog(title: any, method: any ){ // change this when build interface
    this.dialogRef.open(ConfirmationComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      title: title,
      method: method,
      capsuleId: this.capsuleId,
      oninit: ()=>{
        this.capsuleService.getOneCapsule(this.capsuleId).subscribe(capsule => {
          this.selectedCapsuleData = capsule.data;
          this.comments = capsule.data[0].comment;
        })
        this.tokenService.adminMe().subscribe(admin => {
          this.form.role = "admin"
          this.form.user_id = admin.id
        })
      }
    }})
  }

  openRemoveReviewerDialog(data:any, id: any){ // change this when build interface
    this.dialogRef.open(RemoveReviewerComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      reviewerData: data,
      reviewId: id,
      oninit: ()=>{
        this.capsuleService.getOneCapsule(this.capsuleId).subscribe(capsule => {
          this.selectedCapsuleData = capsule.data;
          this.comments = capsule.data[0].comment;
        })
        this.tokenService.adminMe().subscribe(admin => {
          this.form.role = "admin"
          this.form.user_id = admin.id
        })
      }
    }})
  }

  openPdf(data: any) {
    this.capsuleService.getFile(data).subscribe(data=>{
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
    this.form.comment = null;
  }
}
