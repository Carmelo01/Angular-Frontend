import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn())
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean){
    this.loggedIn.next(value)
  }

  constructor(private http: HttpClient,
    public urlService: UrlService,
    private token: TokenService) { }

  login(data: any){
    return this.http.post(this.urlService.url+'api/admin/Login', data)
  }

  loginFaculty(data: any){
    return this.http.post(this.urlService.url+'api/auth/faculty/Login', data)
  }

  registerFaculty(data: any){
    return this.http.post(this.urlService.url+'api/auth/faculty/Signup', data)
  }

  editProfile(data: any, id: any){
    let header = this.token.getHeader()
    return this.http.post(this.urlService.url+`api/admin/edit/profile/${id}`, data, {headers: header})
  }

  logoutAdmin(){
    let header = this.token.getHeader()
    return this.http.post(this.urlService.url+`api/admin/Logout`, {}, {headers: header});
  }

  logoutFaculty(){
    let header = this.token.getHeader()
    return this.http.post(this.urlService.url+`api/auth/faculty/Logout`, {}, {headers: header});
  }

  sendPasswordResetLink(data:any){
    return this.http.post(this.urlService.url+`api/auth/faculty/SendPasswordResetLink`, data)
  }

  changePassword(data:any){
    return this.http.post(this.urlService.url+`api/auth/faculty/ResetPassword`, data)
  }

  changePasswordAdmin(data: any){
    let header = this.token.getHeader()
    return this.http.post(this.urlService.url+`api/admin/change/password`, data, {headers: header})
  }

  sendAdminPasswordResetLink(data:any){
    return this.http.post(this.urlService.url+`api/admin/SendPasswordResetLink`, data)
  }

  forgotPasswordAdmin(data:any){
    return this.http.post(this.urlService.url+`api/admin/ResetPassword`, data);
  }

}
