import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { ExportService } from 'src/app/services/export.service';
import { ExportpdfService } from 'src/app/services/exportpdf.service';
import { PaginateService } from 'src/app/services/paginate.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-review-capsule',
  templateUrl: './review-capsule.component.html',
  styleUrls: ['./review-capsule.component.scss', './review-capsule-con.component.scss']
})
export class ReviewCapsuleComponent implements OnInit{
  origCapsule: any;
  valid:any;
  theme : any;
  searchCapsule = '';
  currentTitle: any;
  currentdata: any
  selectedFilter: string = '-1';
  constructor (public capsuleService: CapsuleService,
    public exportService: ExportService,
    private themeService: ThemeService,
    public paginate: PaginateService,
    private route: ActivatedRoute,
    private token: TokenService,
    private router: Router,
    public exportpdf: ExportpdfService){
      this.capsules = this.route.snapshot.data['capsules'].msg;
    }
  showdetails : boolean = false;
  capsules: any;
  userSelected:any;
  // length: any;
  currentPage = 1; // current page number
  pageSize = 5; // number of items to be shown per page
  show: boolean = false;

  ngOnInit(): void {
    this.theme = this.themeService.getTheme()
    this.currentdata = this.token.me().subscribe(user => {
      this.currentTitle = 'To Review of '+user.fname+' '+user.mname+' '+user.lname
    })
    this.show = false;
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
        this.show = true;
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
