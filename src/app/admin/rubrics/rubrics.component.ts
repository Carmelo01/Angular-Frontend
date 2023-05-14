import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExportService } from 'src/app/services/export.service';
import { RubricService } from 'src/app/services/rubric.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AddTitleComponent } from '../modal/add-title/add-title.component';
import { DeleteRubricComponent } from '../modal/delete-rubric/delete-rubric.component';
import { DeleteTitleComponent } from '../modal/delete-title/delete-title.component';
import { EditRubricComponent } from '../modal/edit-rubric/edit-rubric.component';
import { EditTitleComponent } from '../modal/edit-title/edit-title.component';

@Component({
  selector: 'app-rubrics',
  templateUrl: './rubrics.component.html',
  styleUrls: ['./rubrics.component.scss']
})
export class RubricsComponent implements OnInit{
  // showRubrics: boolean = false;
  showRubrics:any = [];
  listData: any;
  loading: boolean = false;

  listRubrics = [
    {id: 1, title: 'Mobile View?', titleId: 1},
    {id: 2, title: 'User Friendly?', titleId: 1},
    {id: 3, title: 'Hashed Password?', titleId: 3},
    {id: 4, title: 'Protected Routes?', titleId: 3},
  ]
  theme: any;

  constructor(private dialogRef: MatDialog,
    private rubricService: RubricService,
    private themeService: ThemeService,
    public exportService: ExportService,
    private route: ActivatedRoute){
      this.listData = this.route.snapshot.data['rubric']
    }

  ngOnInit(): void {
    this.theme = this.themeService.getTheme()
    this.rubricService.getDefaults().subscribe(data=>{})
  }

  //event: any, 1st parameter if error
  toggleRubrics(index: any){
    this.showRubrics[index] = !this.showRubrics[index];
  }


  openEditTitleDialog(data: any ){ // change this when build interface
    this.dialogRef.open(EditTitleComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      titleData: data,
      oninit: () => {
        this.listData = this.rubricService.getCategory().subscribe(title => {
          this.listData = title;
        })
      }
    }})
  }


  openAddTitleDialog(){ // change this when build interface
    this.dialogRef.open(AddTitleComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      oninit: () => {
        this.listData = this.rubricService.getCategory().subscribe(title => {
          this.listData = title;
        })
      }
    }})
  }

  openDeleteTitleDialog(data: any ){ // change this when build interface
    this.dialogRef.open(DeleteTitleComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      titleData: data,
      oninit: () => {
        this.listData = this.rubricService.getCategory().subscribe(title => {
          this.listData = title;
        })
      }
    }})
  }

  openDeleteRubricDialog(data: any, i: any ){ // change this when build interface
    this.dialogRef.open(DeleteRubricComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      rubricData: data,
      oninit: () => {
        this.listData = this.rubricService.getCategory().subscribe(title => {
          this.listData = title;
          this.toggleRubrics(i)
        })
      }
    }})
  }

  openEditRubricDialog(data: any, i: any  ){ // change this when build interface
    this.dialogRef.open(EditRubricComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
    data: {
      titleData: data,
      oninit: () => {
        this.listData = this.rubricService.getCategory().subscribe(title => {
          this.listData = title;
          this.toggleRubrics(i)
        })
      }
    }})
  }
}
