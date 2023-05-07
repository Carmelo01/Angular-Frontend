import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { ExportService } from 'src/app/services/export.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-review-capsule',
  templateUrl: './review-capsule.component.html',
  styleUrls: ['./review-capsule.component.scss', './review-capsule-con.component.scss']
})
export class ReviewCapsuleComponent implements OnInit{
  origCapsule: any;
  valid:any;
  theme : any;
  searchCapsule = ''
  constructor (public capsuleService: CapsuleService,
    private dialogRef: MatDialog,
    private facultyService: FacultyService,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute){
      this.capsules = this.route.snapshot.data['capsules'].msg;
    }
  showdetails : boolean = false;


    capsules: any;
    userSelected:any;
  // length: any;

  ngOnInit(): void {
    this.theme = this.themeService.getTheme()
  }

  seeDetails(id: any){
    // this.showdetails = !this.showdetails;
    this.capsuleService.getOneCapsuleSamePage(id).subscribe(capsule => {
      this.userSelected = capsule.data;
      this.showdetails = true;
      this.capsuleService.checkIfValid(capsule.data[0].id).subscribe((isValid) => {
        this.valid = isValid
      })
    })
  }

  closeDetails(){
    this.showdetails = false;
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
