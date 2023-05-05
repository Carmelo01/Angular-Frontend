import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { ThemeService } from 'src/app/services/theme.service';
import { UrlService } from 'src/app/services/url.service';
import { EditLogoComponent } from '../modal/edit-logo/edit-logo.component';
import { ThemeConfirmComponent } from '../modal/theme-confirm/theme-confirm.component';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent {

  content: any;
  contentData: any;
  theme:any;

  constructor(
    public url: UrlService,
    private contentService: ContentService,
    private dialogRef: MatDialog,
    private themeService: ThemeService,
    private route: ActivatedRoute
    ) {
      this.contentData = this.route.snapshot.data['content']
    }

  ngOnInit(): void {
    this.content = this.contentData.data[0],
    this.theme = this.themeService.getTheme()
  }

  openEditImageDialog(data: any, type: any ){ // change this when build interface
    this.dialogRef.open(EditLogoComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      content: data,
      type: type
    }})
  }

  openThemeDialog(theme: string){ // change this when build interface
    this.dialogRef.open(ThemeConfirmComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      theme: theme
    }})
  }
}
