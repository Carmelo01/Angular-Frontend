import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TokenService } from 'src/app/services/token.service';
import { AdminChangePassComponent } from '../modal/admin-change-pass/admin-change-pass.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  disabledForms: boolean = true;
  currentUser: any;
  theme:any;
  loading: boolean = false;

  imgChangeEvt:any='';
  cropImgPreview:any='';

  public form = {
    fname: null,
    mname: null,
    lname: null,
    email: null,
    image: null,
  }

  constructor(private tokenService: TokenService,
    private adminService: AuthAdminService,
    private themeService: ThemeService,
    private toastr: ToastrService,
    private dialogRef: MatDialog,
    private activatedRoute: ActivatedRoute) {
      this.currentUser = this.activatedRoute.snapshot.data['profile'];
    }

  ngOnInit(): void {
    this.getCurrentUser();
    this.theme = this.themeService.getTheme()
  }

  onFileChange(event: any){
    this.imgChangeEvt = event;
  }

  cropImg(e: ImageCroppedEvent){
    this.cropImgPreview = e.base64;
  }

  getCurrentUser(){
    this.form.fname = this.currentUser.fname;
    this.form.mname = this.currentUser.mname;
    this.form.lname = this.currentUser.lname;
    this.form.email = this.currentUser.email;
    this.form.image = this.currentUser.profilePic;
    this.cropImgPreview = this.currentUser.profilePic;
  }

  editProfile(): void {
    this.disabledForms = !this.disabledForms
  }

  onSubmit(){
    if(this.imgChangeEvt == "" || this.imgChangeEvt.target.value == ""){
      this.form.image = this.form.image;
    } else {
      this.form.image = this.cropImgPreview;
    }
    // this.form.image = this.cropImgPreview;
    this.loading = true;
    this.adminService.editProfile(this.form, this.currentUser.id).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  openChangePasswordDialog(){ // change this when build interface
    this.dialogRef.open(AdminChangePassComponent, {
    enterAnimationDuration: '400ms',
    exitAnimationDuration: '400ms',
  })}

  handleResponse(data: any){
    this.loading = false;
    this.toastr.success("Update Successfully!");
    // this.getCurrentUser();
    // this.editProfile();
    location.reload();
  }

  handleError(error: any){
    // this.toastr.warning("Please try again. Make sure the image size is below 3mb.");
    if(error.status == 422){
      this.toastr.warning(error.error.msg);
    } else {
      this.toastr.warning("Please try again. Make sure the image size is below 3mb.");
    }
    this.loading = false;
    this.getCurrentUser();
  }

}
