import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExportService } from 'src/app/services/export.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UrlService } from 'src/app/services/url.service';
import { ConfirmVerifyComponent } from '../modal/confirm-verify/confirm-verify.component';

@Component({
  selector: 'app-verify-faculty',
  templateUrl: './verify-faculty.component.html',
  styleUrls: ['./verify-faculty.component.scss']
})
export class VerifyFacultyComponent implements OnInit {
  faculties:any;
  loading: boolean = false
  theme: any;

  constructor(private facultyService: FacultyService,
    public url: UrlService,
    private dialogRef: MatDialog,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute
    ) {
      this.faculties = this.route.snapshot.data['faculty']
    }

  ngOnInit(): void {
    this.theme = this.themeService.getTheme()
  }

  openConfirmVerifyDialog(data: any ){ // change this when build interface
    this.dialogRef.open(ConfirmVerifyComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      userData: data,
      oninit: () => {
        this.faculties = this.facultyService.allUnverified().subscribe(faculty => {
          this.faculties = faculty;

        })
      }
    }})
  }

}
