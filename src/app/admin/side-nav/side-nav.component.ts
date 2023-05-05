import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { ThemeService } from 'src/app/services/theme.service';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit{
  image:any;
  theme: any;
  constructor(public generalService: GeneralService,
    private contentService: ContentService,
    private themeService: ThemeService
    ) {}

  ngOnInit(): void {
    this.getImage();
    this.theme = this.themeService.getTheme()
  }

  getImage(){
    this.image = this.contentService.getContent().subscribe(content => {
      this.image = content.data[0]
    })
  }

}
