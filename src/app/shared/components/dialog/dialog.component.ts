import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CapsuleService } from 'src/app/services/capsule.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit{

  faculties: any;
  isValid: boolean = true;
  selectedFaculty:any[] = [];
  loading: boolean = false;
  reviewers: any;
  filteredFaculty: any[] = [];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private facultyService: FacultyService,
    public generalService: GeneralService,
    private capsuleService: CapsuleService,
    private router: Router,
    private dialogRef: MatDialogRef<DialogComponent>,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.showFaculty();
    this.reviewers = this.data.capsuleData.assigncapsule;
    this.selectedFaculty = new Array<any>();
  }

  showFaculty(){
    this.faculties = this.facultyService.allFacultyList().subscribe(faculty => {
      this.faculties = faculty;
      this.filterFaculty();
    })
  }
  filterFaculty(){
    let ctr = 0;
    for(let f of this.faculties.msg){
      for(let r of this.reviewers){
        if(f.id == r.faculty_id){
          ctr++;
          this.selectedFaculty.push(f.fname);
        }
      }
      if(ctr == 0){
        this.filteredFaculty.push(f);
      }
      ctr = 0;
    }
  }

  getFacultyId(e:any, id:any){
    if(e.target.checked){
      this.selectedFaculty.push(id);
    } else {
      this.selectedFaculty = this.selectedFaculty.filter(m=>m!=id);
    }

    if(this.selectedFaculty.length > 3){
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }

  onSubmit(){
    this.loading = true;
    this.capsuleService.assignedReviewers(this.selectedFaculty, this.data.capsuleId).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.toastr.success("Added Reviewer Successfully!");
    this.dialogRef.close();
    this.data.oninit()
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
