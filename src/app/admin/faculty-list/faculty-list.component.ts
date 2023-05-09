import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExportService } from 'src/app/services/export.service';
import { ExportpdfService } from 'src/app/services/exportpdf.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { PaginateService } from 'src/app/services/paginate.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit{

  faculties: any;
  theme: any;
  searchFaculty = '';
  currentPage = 1; // current page number
  pageSize = 5; // number of items to be shown per page

  constructor(private facultyService: FacultyService,
    public url: UrlService,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    public paginate: PaginateService,
    public exportpdf: ExportpdfService) {
      this.faculties = this.route.snapshot.data['faculty'];
    }

  ngOnInit(): void {
    this.theme = this.themeService.getTheme()
  }

  formatReqDate(dateReq: Date){
    return formatDate(dateReq, 'yyyy-MM-dd', 'en_PH')
  }

}
