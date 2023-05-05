import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../shared/material.module';
import { CapsulesComponent } from './capsules/capsules.component';
import { ContentManagementComponent } from './content-management/content-management.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { CapsuleDetailsComponent } from './capsules/capsule-details/capsule-details.component';
import { SharedModule } from '../shared/shared.module';
import { RubricsComponent } from './rubrics/rubrics.component';
import { EditTitleComponent } from './modal/edit-title/edit-title.component';
import { DeleteTitleComponent } from './modal/delete-title/delete-title.component';
import { AddRubricsComponent } from './rubrics/add-rubrics/add-rubrics.component';
import { FormsModule } from '@angular/forms';
import { AddTitleComponent } from './modal/add-title/add-title.component';
import { AfterAdminLoginGuard } from '../guard/after-admin-login.guard';
import { VerifyFacultyComponent } from './verify-faculty/verify-faculty.component';
import { EditRubricComponent } from './modal/edit-rubric/edit-rubric.component';
import { DeleteRubricComponent } from './modal/delete-rubric/delete-rubric.component';
import { ConfirmVerifyComponent } from './modal/confirm-verify/confirm-verify.component';
import { EditLogoComponent } from './modal/edit-logo/edit-logo.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditSidenavComponent } from './modal/edit-sidenav/edit-sidenav.component';
import { LogoutComponent } from './modal/logout/logout.component';
import { ChartModule } from 'angular-highcharts';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { ConfirmationComponent } from './modal/confirmation/confirmation.component';
import { RemoveReviewerComponent } from './modal/remove-reviewer/remove-reviewer.component';
import { CapsuleResolver } from '../resolver/capsule.resolver';
import { ChartDataResolver } from '../resolver/chart-data.resolver';
import { FacultyResolver } from '../resolver/faculty.resolver';
import { UnverifiedFacultyResolver } from '../resolver/unverified-faculty.resolver';
import { ContentResolver } from '../resolver/content.resolver';
import { RubricsResolver } from '../resolver/rubrics.resolver';
import { ThemeConfirmComponent } from './modal/theme-confirm/theme-confirm.component';
import { GetOneCapsuleResolver } from '../resolver/get-one-capsule.resolver';
import { EditProfileResolver } from '../resolver/edit-profile.resolver';


@NgModule({
  declarations: [
    AdminComponent,
    SideNavComponent,
    HeaderComponent,
    DashboardComponent,
    CapsulesComponent,
    ContentManagementComponent,
    EditProfileComponent,
    FacultyListComponent,
    CapsuleDetailsComponent,
    RubricsComponent,
    EditTitleComponent,
    DeleteTitleComponent,
    AddRubricsComponent,
    AddTitleComponent,
    VerifyFacultyComponent,
    EditRubricComponent,
    DeleteRubricComponent,
    ConfirmVerifyComponent,
    EditLogoComponent,
    EditSidenavComponent,
    LogoutComponent,
    LineChartComponent,
    ConfirmationComponent,
    RemoveReviewerComponent,
    ThemeConfirmComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ChartModule,
    SharedModule,
    ImageCropperModule,
    RouterModule.forChild([
      { path: 'admin', component: AdminComponent, children: [
        { path: 'home', component: DashboardComponent, resolve: { capsules: CapsuleResolver, chart: ChartDataResolver}},
        { path: 'capsule', component: CapsulesComponent, resolve: { capsules: CapsuleResolver}},
        { path: 'capsule/:id', component: CapsuleDetailsComponent, resolve: { capsule: GetOneCapsuleResolver}},
        { path: 'content-management', component: ContentManagementComponent, resolve: { content: ContentResolver}},
        { path: 'edit/profile', component: EditProfileComponent, resolve: { profile: EditProfileResolver}},
        { path: 'faculty', component: FacultyListComponent, resolve: { faculty: FacultyResolver}},
        { path: 'verify_faculty', component: VerifyFacultyComponent, resolve: { faculty: UnverifiedFacultyResolver}},
        { path: 'rubrics', component: RubricsComponent, resolve: { rubric: RubricsResolver}},
        { path: 'rubrics/add/:id', component: AddRubricsComponent},
        { path: 'line/chart', component: LineChartComponent},
        { path: '', redirectTo: 'home', pathMatch: 'full'}
      ],
      canActivate: [AfterAdminLoginGuard.canActivate]
    },
    ])
  ]
})
export class AdminModule { }
