import { formatDate } from '@angular/common';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { UrlService } from 'src/app/services/url.service';
// import { fade } from 'src/app/shared/animations/fade.animation';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { GeneralService } from 'src/app/shared/services/general.service';


import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReviseService } from 'src/app/services/revise.service';
import { AddRevisedComponent } from '../Modal/add-revised/add-revised.component';
import { filter, pairwise } from 'rxjs/operators';
import { TokenService } from 'src/app/services/token.service';
import { RubricService } from 'src/app/services/rubric.service';
import { ExportService } from 'src/app/services/export.service';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-view-my-capsule',
  templateUrl: './view-my-capsule.component.html',
  styleUrls: ['./view-my-capsule.component.scss']
})
export class ViewMyCapsuleComponent implements OnInit{
  result: any;
  showComment:boolean = false;
  status: string = '0';
  capsuleId: any;
  selectedCapsuleData: any = null;
  showDiv = false;
  holderObs : any;
  showAllComment:boolean = false;
  comments: any[] = []

  loading: boolean = false
  // public form = {
  //   description: '',
  // }
  public form = {
    comment: null,
    role: '',
    user_id: null
  }

  usernum: any[] = []

  file: any;
  theme: any;

  constructor(public generalService: GeneralService,
    private capsuleService: CapsuleService,
    private dialogRef: MatDialog,
    private themeService: ThemeService,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private toastr: ToastrService,
    public urlService: UrlService,
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
    //this.getData()
    this.comments = this.selectedCapsuleData[0].comment;
    this.tokenService.me().subscribe(user => {
      this.form.role = "user"
      this.form.user_id = user.id
    })
    this.theme = this.themeService.getTheme()
    for(let i = 0; i < this.selectedCapsuleData[0].assigncapsule.length; i++){
      const f = this.selectedCapsuleData[0].assigncapsule[i]
      let data = {
        id: f.faculty_id,
        number: i+1
      }
      this.usernum.push(data)
    }
    let userData = {
      id: this.selectedCapsuleData[0].user.id,
      number: 4
    }
    this.usernum.push(userData)
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

  exportToService(user_id: any, type: string){
    let data ={
      reviewer_id: user_id,
      capsule_id: this.capsuleId
    }
    this.rubricService.getGradedRubric(data).subscribe(datas => {
      if(type == 'pdf'){
        this.exportService.exportpdfGradedCapsule(datas, datas);
      }else{
        this.exportService.exportGradedRubric(datas, datas);
      }
    })
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
    data: {
      capsuleId: this.capsuleId,
      oninit: () => {
        this.capsuleService.getOneCapsule(this.capsuleId).subscribe(capsule => {
          this.selectedCapsuleData = capsule.data;
        })
      }
    }
  })
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
    this.form.comment = null
  }

}
