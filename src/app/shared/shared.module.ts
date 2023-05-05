import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { LoaderButtonComponent } from './components/loader-button/loader-button.component';

@NgModule({
  declarations: [
    DialogComponent,
    LoaderComponent,
    LoaderButtonComponent
  ],
  exports: [
    DialogComponent,
    LoaderComponent,
    LoaderButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class SharedModule { }
