import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { ThemeConfirmComponent } from 'src/app/admin/modal/theme-confirm/theme-confirm.component';
import { FacultyService } from 'src/app/services/faculty.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-faculty-edit-profile',
  templateUrl: './faculty-edit-profile.component.html',
  styleUrls: ['./faculty-edit-profile.component.scss']
})
export class FacultyEditProfileComponent implements OnInit{
  disabledForms: boolean = true;
  loading: boolean = false;
  imgChangeEvt:any='';
  cropImgPreview:any='';
  currentUser: any;
  isShow: boolean = false;
  showLabel = true;

  imageSelected: boolean = false;


  public form = {
    fname: null,
    mname: null,
    lname: null,
    email: null,
    contact: null,
    image: null,
  }
  theme: any;

  constructor(private tokenService:TokenService,
    private facultyService: FacultyService,
    private toastr: ToastrService,
    private themeService: ThemeService,
    private dialogRef: MatDialog,
    private activatedRoute: ActivatedRoute) {
      this.currentUser = this.activatedRoute.snapshot.data['profile'];
    }

  ngOnInit(): void {
    this.me();
    this.theme = this.themeService.getTheme()
  }

  editProfile(): void {
    this.disabledForms = !this.disabledForms
    this.me()
  }

  me(){
    // this.currentUser=this.tokenService.me().subscribe(user=>{
    //   this.currentUser = user
    //   this.form.fname = user.fname;
    //   this.form.mname = user.mname;
    //   this.form.lname = user.lname;
    //   this.form.email = user.email;
    //   this.form.contact = user.contact;
    //   this.form.image = user.profilePic;
    //   this.cropImgPreview = user.profilePic;
    // })
    this.form.fname = this.currentUser.fname;
    this.form.mname = this.currentUser.mname;
    this.form.lname = this.currentUser.lname;
    this.form.email = this.currentUser.email;
    this.form.contact = this.currentUser.contact;
    this.form.image = this.currentUser.profilePic;
    this.cropImgPreview = this.currentUser.profilePic;
  }

  onSubmit(){
    if(this.imgChangeEvt == "" || this.imgChangeEvt.target.value == ""){
      this.form.image = this.form.image;
    } else {
      this.form.image = this.cropImgPreview;
    }
    this.loading = true;
    this.facultyService.editProfile(this.form).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  onFileChange(event: any){
    this.isShow = true;
    this.imgChangeEvt = event;
    this.imageSelected = true;
  }

  cropImg(e: ImageCroppedEvent){
    this.cropImgPreview = e.base64;
  }

  handleResponse(data: any){
    this.loading = false;
    this.toastr.success("Update Successfully!");
    location.reload();
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
    this.me();
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
