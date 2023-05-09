import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CapsuleService } from 'src/app/services/capsule.service';
import { slideInAnimation } from 'src/app/shared/animations/app.animation';
import { AddCapsuleComponent } from '../Modal/add-capsule/add-capsule.component';
import { EditCapsuleComponent } from '../Modal/edit-capsule/edit-capsule.component';
import { DeleteCapsuleComponent } from '../Modal/delete-capsule/delete-capsule.component';
import { ExportService } from 'src/app/services/export.service';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { PaginateService } from 'src/app/services/paginate.service';
import html2pdf from 'html2pdf.js';





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
  searchCapsule = '';
  userSelected: any;
  currentPage = 1; // current page number
  pageSize = 5; // number of items to be shown per page
  selectedFilter: string = '-1';

  constructor(public capsuleService: CapsuleService,
    private dialogRef: MatDialog,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    public paginate: PaginateService) {
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

  
  exportTableAsPdf(template:any): void {
    console.log(template)
    const table = document.getElementById('content');
    // Create a new div element for the table and header, and add the modified CSS to it
    const tableDiv = document.createElement('div');
    tableDiv.innerHTML = `
      <div class="header"><img src="assets/exportpdfHeader.png" style="width: 100%;" /></div>
      <div class="username" style="text-align:center;">
        <h3> UserFullName's Capsule/s</h3>
      </div>     
      <style>
        .pdf-table th mat-icon {
          display: none;
        }
        .pdf-table td:last-child,
        .pdf-table th:last-child {
          display: none;
        }
  
        .pdf-table {
          
          width:80% !important;
          background-color: transparent;
          border-collapse: collapse;
          margin: 5% 10% 0 10% !important;
        }
        .pdf-table tbody th,
        .pdf-table tbody td {
          background-color: #fff;
          border: 1px solid black;
          font-size:10px;
          width:5%;
        }
        
      </style>
    `;
    const footerdiv = document.createElement('div');
    footerdiv.innerHTML = `
    <div class="footer" style="position:relative; text-align:right; right:10px;">
      <span>Created on: ${new Date().toLocaleString()}</span>
    </div> `;
  
    // Add the header and table to the new div element
    if (table) {
      tableDiv.appendChild(table.cloneNode(true));
      tableDiv.appendChild(footerdiv.cloneNode(true));
    }


    // Pass the new div element to html2pdf() instead of the table element
    const options = {
      filename: 'my-capsule.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' },
      multipage: true
    };
    html2pdf().set(options).from(tableDiv).save();
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

  get filteredItems(): string[] {
    let capsule = this.capsules.data
    if (!this.selectedFilter || this.selectedFilter == '-1') {
      return this.capsules.data;
    }

    return capsule.filter( (item: any) => item.status.toLowerCase().startsWith(this.selectedFilter.toLowerCase()));
  }

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
          if(capsule.data.length > 0){
            this.noCapsule = false;
          } else {
            this.noCapsule = true
          }
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

