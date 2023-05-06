import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { UrlService } from './url.service';


@Injectable({
  providedIn: 'root'
})
export class ReviseService {

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    public urlService: UrlService) { }

  addCapsuleRevision(data: any, id: any){
    let header = this.tokenService.getHeader()
    return this.http.post(this.urlService.url + `api/revise/capsule/upload/${id}`, data, {headers: header})
  }
}
