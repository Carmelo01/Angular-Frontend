import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { AdminModule } from './admin/admin.module';
import { FacultyModule } from './faculty/faculty.module';
import {MatIconModule} from '@angular/material/icon';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


import { AppComponent } from './app.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { FacultyLoginComponent } from './auth/faculty-login/faculty-login.component';
import { AdminForgotPasswordComponent } from './auth/admin-forgot-password/admin-forgot-password.component';
import { ToastrModule } from 'ngx-toastr';
import { BeforeAdminLoginGuard } from './guard/before-admin-login.guard';
import { FacultyRegisterComponent } from './auth/faculty-register/faculty-register.component';
import { BeforeFacultyLoginGuard } from './guard/before-faculty-login.guard';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {ChartModule} from 'angular-highcharts'

// import { ImageCropperModule } from 'ngx-image-cropper';

import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    FacultyLoginComponent,
    AdminForgotPasswordComponent,
    FacultyRegisterComponent,


  ],
  imports: [
    BrowserModule,
    ChartModule,
    MaterialModule,
    FormsModule,
    AdminModule,
    FacultyModule,
    SharedModule,
    HttpClientModule,
    MatIconModule,
    ImageCropperModule,
    ButtonsModule,
    NgxExtendedPdfViewerModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      // { path: 'welcome', component: WelcomeComponent },
      { path: 'faculty', loadChildren: () => import('./faculty/faculty.module').then(m => m.FacultyModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
      { path: 'faculty/login', component: FacultyLoginComponent, canActivate: [BeforeFacultyLoginGuard.canActivate] },
      { path: 'faculty/register', component: FacultyRegisterComponent},
      { path: 'admin/login', component: AdminLoginComponent, canActivate: [BeforeAdminLoginGuard.canActivate] },
      { path: 'faculty/forgot/password', component: AdminForgotPasswordComponent },
      { path: '', redirectTo: 'faculty/login', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
