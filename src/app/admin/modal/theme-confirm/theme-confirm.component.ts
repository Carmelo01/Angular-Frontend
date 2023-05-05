import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-theme-confirm',
  templateUrl: './theme-confirm.component.html',
  styleUrls: ['./theme-confirm.component.scss']
})
export class ThemeConfirmComponent {
  result: any;
  loading: boolean = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ThemeConfirmComponent>,
    private toastr: ToastrService,
    private route: Router,
    private location: Location,
    // private window: Window
    ) {}

  ngOnInit(): void {
    this.result = this.data
  }
  onSubmit(){
    this.loading = true
    let themeStorage = localStorage.getItem('theme')
    if(themeStorage){
      localStorage.removeItem('theme');
      localStorage.setItem('theme', this.result.theme);
    } else {
      localStorage.setItem('theme', this.result.theme);
    }
    this.dialogRef.close();
    this.toastr.success("Theme Changed");
    this.loading = false
    location.reload();
  }

}
