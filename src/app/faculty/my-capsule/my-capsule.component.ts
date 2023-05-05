import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCapsuleComponent } from '../Modal/create-capsule/create-capsule.component';
import { CapsuleService } from 'src/app/services/capsule.service';
import { slideInAnimation } from 'src/app/shared/animations/app.animation';
import { AddCapsuleComponent } from '../Modal/add-capsule/add-capsule.component';
import { EditCapsuleComponent } from '../Modal/edit-capsule/edit-capsule.component';
import { DeleteCapsuleComponent } from '../Modal/delete-capsule/delete-capsule.component';
import { ExportService } from 'src/app/services/export.service';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-my-capsule',
  templateUrl: './my-capsule.component.html',
  styleUrls: ['./my-capsule.component.scss', './my-capsule-con.component.scss'],
  animations:[slideInAnimation]
})
export class MyCapsuleComponent implements OnInit {
  // title = 'Faculty | My Capsule';
  selectedRowIndex: any;
  showdetails : boolean = false;
  noCapsule:boolean = false;
  theme : any;

  capsules: any;

  userSelected: any;

  constructor(public capsuleService: CapsuleService,
    private dialogRef: MatDialog,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute) {
      this.capsules = this.route.snapshot.data['capsules'];
    }

  ngOnInit(): void {
    // You can perform initialization tasks here
    // this.showCapsules();
    if(this.capsules.data.length > 0){
      this.noCapsule = false;
    } else {
      this.noCapsule = true
    }
    this.theme = this.themeService.getTheme()
  }

  // showCapsules(){
  //   this.capsules = this.capsuleService.getUserCapsules().subscribe(capsule => {
  //     this.capsules = capsule;
  //     if(capsule.data.length > 0){
  //       this.noCapsule = false;
  //     } else {
  //       this.noCapsule = true
  //     }
  //   })
  // }

  seeDetails(id:any){
    this.capsuleService.getOneCapsuleSamePage(id).subscribe(capsule => {
      this.userSelected = capsule.data;
      this.showdetails = true;
    })
  }
  closeDetails(){
    this.showdetails = false;
  }
  formatReqDate(dateReq: Date){
    return formatDate(dateReq, 'yyyy-MM-dd', 'en_PH')
  }

  openAddTitleDialog(){ // change this when build interface
    this.dialogRef.open(AddCapsuleComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      oninit: () => {
        this.capsules = this.capsuleService.getUserCapsules().subscribe(capsule => {
          this.capsules = capsule;
        })
      }
    }})
  }

  openEditCapsuleDialog(){ // change this when build interface
    this.dialogRef.open(EditCapsuleComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      capsule: this.userSelected,
      oninit: () => {
        this.capsules = this.capsuleService.getUserCapsules().subscribe(capsule => {
          this.capsules = capsule;
        })
      },
      close: () => {this.showdetails = false;}
    }})
  }

  openDeleteCapsuleDialog(){ // change this when build interface
    this.dialogRef.open(DeleteCapsuleComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      capsule: this.userSelected,
      oninit: () => {
        this.capsules = this.capsuleService.getUserCapsules().subscribe(capsule => {
          this.capsules = capsule;
        })
      },
      close: () => {this.showdetails = false;}
    }})
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

}

