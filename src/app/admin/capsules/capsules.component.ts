import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { ExportService } from 'src/app/services/export.service';
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

  constructor(private capsuleService: CapsuleService,
    public url: UrlService,
    public exportService: ExportService,
    private themeService: ThemeService,
    private route: ActivatedRoute) {
      this.capsules = this.route.snapshot.data['capsules']
    }

  ngOnInit(): void {
    //this.showCapsules()
    console.log(this.capsules)
    this.theme = this.themeService.getTheme()
  }


}
