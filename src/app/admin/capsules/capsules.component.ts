import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { ExportService } from 'src/app/services/export.service';
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

  constructor(private capsuleService: CapsuleService,
    public url: UrlService,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute,
    public paginate: PaginateService) {
      this.capsules = this.route.snapshot.data['capsules'].data
    }

  ngOnInit(): void {
    //this.showCapsules()
    this.theme = this.themeService.getTheme()
  }


}
