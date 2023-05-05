import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

interface TokenData {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  data!: TokenData | null;
  header: any;
  constructor(public urlService: UrlService,
    private http:HttpClient) { }

  handle(token: any){
    this.set(token);
  }

  set(token: any){
    localStorage.setItem('token', JSON.stringify(token));
  }

  get(){
    var getObj = localStorage.getItem('token')
    if(getObj){
      this.data = JSON.parse(getObj);
    }
    const data: TokenData | null = this.data
    return data;
  }

  remove(){
    localStorage.removeItem('token');
  }

  isValid(){
    let d = this.get()
    if(d){
      const token = d.token
      const role = d.role
      if(token){
        const payload = this.payload(token)
        if(payload && role === 'admin'){
          return payload.iss == this.urlService.url+'api/admin/Login' ? true : false;
        } else if (payload && role === 'faculty'){
          return payload.iss == this.urlService.url+'api/auth/faculty/Login' ? true : false;
        } else {
          this.remove()
          return false;
        }
      }
    }
    return false;
  }

  payload(token: any){
    const payload = token.split('.')[1];
    return this.decode(payload)
  }

  decode(payload: any){
    return JSON.parse(window.atob(payload));
  }

  loggedIn(){
    return this.isValid();
  }

  me(){
    let httpHeader = this.getHeader();
    return this.http.get<any>(this.urlService.url+`api/auth/faculty/Me`, {headers:httpHeader})
  }


  adminMe(){
    let httpHeader = this.getHeader();
    return this.http.get<any>(this.urlService.url+`api/admin/Me`, {headers:httpHeader})
  }

  getHeader(){
    let token = this.get();
    if (token){
      this.header = new HttpHeaders().set(
        "Authorization",
        'Bearer ' + token.token)
    }
    else{
      this.header=null;
    }
    return this.header;
  }
}
