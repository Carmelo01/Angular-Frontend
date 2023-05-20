import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class CapsuleService {

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    public urlService: UrlService) { }

  capsuleList(){
    return this.http.get<any>(this.urlService.url+`api/capsule/index`);
  }

  getOneCapsule(id: any){
    return this.http.get<any>(this.urlService.url+`api/capsule/${id}/get`);
  }

  getOneMyCapsule(id: any){
    return this.http.get<any>(this.urlService.url+`api/capsule/currentUser/getOne/${id}`);
  }

  getOneCapsuleSamePage(id: any){
    return this.http.get<any>(this.urlService.url+`api/capsule/click/${id}`);
  }

  addCapusle(data: any){
    let header = this.tokenService.getHeader()
    return this.http.post(this.urlService.url + `api/capsule/create`, data, {headers: header})
  }

  editCapsule(data: any, id: any){
    let header = this.tokenService.getHeader()
    return this.http.post(this.urlService.url + `api/capsule/edit/${id}`, data, {headers: header})
  }

  deleteCapsule(id: any){
    return this.http.delete(this.urlService.url + `api/capsule/softdelete/${id}`)
  }

  assignedReviewers(data: any, id: any){
    return this.http.post(this.urlService.url+`api/assignFaculty/${id}`, data)
  }

  getChartData(){
    return this.http.get<any>(this.urlService.url+`api/dashboard/data/get`);
  }

  getLineChartData(){
    return this.http.get<any>(this.urlService.url+`api/dashboard/chartdata/get`);
  }

  postComment(data:any, id: any){
    return this.http.post(this.urlService.url+`api/comment/post/${id}`, data)
  }

  rejectCapsule(data: any, id: any){
    return this.http.post(this.urlService.url+`api/capsule/reject/${id}`, data)
  }

  approveCapsule(id: any){
    return this.http.post(this.urlService.url+`api/capsule/approve/${id}`, {})
  }

  submitCapsule(id: any){
    return this.http.post(this.urlService.url+`api/capsule/submitTo/${id}`, {})
  }

  reviseCapsule(id: any){
    return this.http.post(this.urlService.url+`api/capsule/revise/${id}`, {})
  }

  removeReviewer(id: any){
    return this.http.post(this.urlService.url+`api/capsule/remove/reviewer/${id}`, {})
  }

  gradeCapsule(data:any, id:any){
    let header = this.tokenService.getHeader()
    return this.http.post(this.urlService.url+`api/capsule/review/grade/${id}`, data, {headers: header})
  }

  checkIfValid(id:any){
    let header = this.tokenService.getHeader()
    return this.http.get(this.urlService.url+`api/check/currentUser/is_valid/${id}`, {headers: header})
  }

  getUserCapsules(){
    let token = this.tokenService.get()
    if(token){
       let header = new HttpHeaders().set(
        "Authorization",
        'Bearer ' + token.token
      );
      return this.http.get<any>(this.urlService.url+`api/myCapsule`, {headers: header});
    }
    else{
      return this.http.get<any>(this.urlService.url+`api/myCapsule`);
    }

  }

  GenerateInvoicePDF(url:any){
    return this.http.get(this.urlService.url+url, {observe:'response',responseType:'blob'});
  }
  getFile(filename: string) {
    const newString = filename.replace(/\//g, '-');
    // return this.http.get(this.urlService.url+'api/file/' + newString, { responseType: 'blob' });
    return this.http.get(this.urlService.url+'api/file/'+newString, { responseType: 'arraybuffer' })
  }



}
