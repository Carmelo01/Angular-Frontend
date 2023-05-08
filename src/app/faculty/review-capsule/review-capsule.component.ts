import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { ExportService } from 'src/app/services/export.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { PaginateService } from 'src/app/services/paginate.service';
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
  selectedFilter: string = '-1';
  constructor (public capsuleService: CapsuleService,
    private dialogRef: MatDialog,
    private facultyService: FacultyService,
    public exportService: ExportService,
    private themeService: ThemeService,
    public paginate: PaginateService,
    private route: ActivatedRoute){
      this.capsules = this.route.snapshot.data['capsules'].msg;
    }
  showdetails : boolean = false;
  capsules: any;
  userSelected:any;
  // length: any;
  currentPage = 1; // current page number
  pageSize = 5; // number of items to be shown per page

  ngOnInit(): void {
    this.theme = this.themeService.getTheme()
  }

  get filteredItems(): string[] {
    let capsule = this.capsules
    if (!this.selectedFilter || this.selectedFilter == '-1') {
      return this.capsules;
    }

    return capsule.filter( (item: any) => item.capsule.status.toLowerCase().startsWith(this.selectedFilter.toLowerCase()));
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
