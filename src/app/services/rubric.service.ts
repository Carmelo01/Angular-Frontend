import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RubricService {

  constructor(private http: HttpClient,
    public urlService: UrlService,
    private token: TokenService) { }

  //category api
  getCategory(){
    return this.http.get<any>(this.urlService.url+`api/category/index`);
  }

  getOneCategory(id: any){
    return this.http.get<any>(this.urlService.url+`api/category/getOne/${id}`);
  }

  editCategory(data: any, id:any){
    return this.http.post(this.urlService.url+`api/category/edit/${id}`, data)
  }

  addCategory(data: any){
    return this.http.post(this.urlService.url+`api/category/add`, data)
  }

  removeCategory(id:any){
    return this.http.delete(this.urlService.url+`api/category/soft_delete/${id}`)
  }

  //rubric api
  removeRubric(id:any){
    return this.http.delete(this.urlService.url+`api/rubrics/soft_delete/${id}`)
  }

  editRubric(data: any, id:any){
    return this.http.post(this.urlService.url+`api/rubrics/edit/${id}`, data)
  }

  addRubric(data:any, id: any){
    return this.http.post(this.urlService.url+`api/rubrics/add/${id}`, data)
  }

  getGradedRubric(data: any){
    let header = this.token.getHeader()
    return this.http.post(this.urlService.url+`api/graded/rubric/get`, data, {headers: header})
  }
}
