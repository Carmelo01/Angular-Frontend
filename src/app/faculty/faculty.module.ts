import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { FacultyComponent } from './faculty.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../shared/material.module';
import { MyCapsuleComponent } from './my-capsule/my-capsule.component';
import { ReviewCapsuleComponent } from './review-capsule/review-capsule.component';
import { FacultyEditProfileComponent } from './faculty-edit-profile/faculty-edit-profile.component';

import { AfterFacultyLoginGuard } from '../guard/after-faculty-login.guard';
import { GradeCapsuleComponent } from './grade-capsule/grade-capsule.component';
import { UploadRevisionComponent } from './upload-revision/upload-revision.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ViewMyCapsuleComponent } from './view-my-capsule/view-my-capsule.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LogoutComponent } from './Modal/logout/logout.component';
import { AddCapsuleComponent } from './Modal/add-capsule/add-capsule.component';
import { EditCapsuleComponent } from './Modal/edit-capsule/edit-capsule.component';
import { DeleteCapsuleComponent } from './Modal/delete-capsule/delete-capsule.component';
import { AddRevisedComponent } from './Modal/add-revised/add-revised.component';
import { ReviewSpecificCapsuleComponent } from './review-specific-capsule/review-specific-capsule.component';
import { GetAssignedResolver } from '../resolver/get-assigned.resolver';
import { MycapsuleResolver } from '../resolver/mycapsule.resolver';
import { GetOneCapsuleResolver } from '../resolver/get-one-capsule.resolver';
import { GetOneMycapsuleResolver } from '../resolver/get-one-mycapsule.resolver';
import { UserEditProfileResolver } from '../resolver/user-edit-profile.resolver';
import { SearchFacultyPipe } from '../pipes/search-faculty.pipe';
import { ForgetPasswordComponent } from './Modal/forget-password/forget-password.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FacultyComponent,
    MyCapsuleComponent,
    ReviewCapsuleComponent,
    FacultyEditProfileComponent,
    GradeCapsuleComponent,
    UploadRevisionComponent,
    ViewMyCapsuleComponent,
    LogoutComponent,
    AddCapsuleComponent,
    EditCapsuleComponent,
    DeleteCapsuleComponent,
    AddRevisedComponent,
    ReviewSpecificCapsuleComponent,
    SearchFacultyPipe,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    NgxExtendedPdfViewerModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ImageCropperModule,
    RouterModule.forChild([
      { path: 'faculty', component: FacultyComponent, children: [
        { path: '', redirectTo: 'my-capsule', pathMatch: 'full' }, // Redirect empty path to 'home'
        { path: 'my-capsule', component: MyCapsuleComponent, resolve: { capsules: MycapsuleResolver} }, // Route for 'my-capsule' component
        { path: 'my-capsule/:id', component: ViewMyCapsuleComponent, resolve: { capsule: GetOneMycapsuleResolver} },
        { path: 'review/capsule', component: ReviewCapsuleComponent, resolve: { capsules: GetAssignedResolver}},
        { path: 'expand_capsule_details/:id', component: ReviewSpecificCapsuleComponent, resolve: { capsule: GetOneCapsuleResolver}},
        { path: 'edit_profile', component: FacultyEditProfileComponent, resolve: { profile: UserEditProfileResolver} },
        { path: 'grade_capsule', component: GradeCapsuleComponent},
        { path: 'grade_capsule/:id', component: GradeCapsuleComponent},
        { path: 'upload_revision', component: UploadRevisionComponent},
        { path: '', redirectTo: 'my-capsule', pathMatch: 'full'}

      ]
      , canActivate: [AfterFacultyLoginGuard.canActivate]
    },

    ])
  ]
})
export class FacultyModule { }
