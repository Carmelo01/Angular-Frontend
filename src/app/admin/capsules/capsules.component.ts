import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { ExportService } from 'src/app/services/export.service';
import { ExportpdfService } from 'src/app/services/exportpdf.service';
import { PaginateService } from 'src/app/services/paginate.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-capsules',
  templateUrl: './capsules.component.html',
  styleUrls: ['./capsules.component.scss']
})
export class CapsulesComponent implements OnInit{

  capsules: any;
  theme: any;
  searchQuery: any = '';
  searchCapsule = '';
  currentPage = 1; // current page number
  pageSize = 5; // number of items to be shown per page
  selectedFilter: string = '-1';

  constructor(private capsuleService: CapsuleService,
    public url: UrlService,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    public exportpdf: ExportpdfService,
    public paginate: PaginateService) {
      this.capsules = this.route.snapshot.data['capsules'].data
    }

  ngOnInit(): void {
    //this.showCapsules()
    this.theme = this.themeService.getTheme()
  }

  get filteredItems(): string[] {
    let capsule = this.capsules
    if (!this.selectedFilter || this.selectedFilter == '-1') {
      return this.capsules;
    }

    return capsule.filter( (item: any) => item.status.toLowerCase().startsWith(this.selectedFilter.toLowerCase()));
  }


}
