import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  constructor(private http: HttpClient,
  public urlService: UrlService,
  private token: TokenService) { }

  allFacultyList(){
    return this.http.get<any>(this.urlService.url+`api/faculty/index`);
  }

  allUnverified(){
    return this.http.get<any>(this.urlService.url+`api/faculty/unverified`);
  }

  getBothFaculty(){
    return this.http.get<any>(this.urlService.url+`api/faculty/get/both`);
  }

  verifyFaculty(id: any){
    return this.http.post(this.urlService.url + `api/admin/verify/faculty/${id}`, {})
  }

  editProfile(data: any){
    let header = this.token.getHeader()
    return this.http.post(this.urlService.url+`api/faculty/edit/profile`, data, {headers: header})
  }

  getAssignedCapsule(){
    let header = this.token.getHeader()
    return this.http.get<any>(this.urlService.url+`api/faculty/capsule/getAssigned`, {headers: header})
  }

}
