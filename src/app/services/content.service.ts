import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient,
    public urlService: UrlService) { }

  getContent(){
    return this.http.get<any>(this.urlService.url+`api/admin/content/index`);
  }

  editLogo(data: any, id: any){
    return this.http.post(this.urlService.url+`api/admin/content/edit/logo/${id}`, data);
  }

  editSideNav(data: any, id: any){
    return this.http.post(this.urlService.url+`api/admin/content/edit/sideNav/${id}`, data);
  }
}
