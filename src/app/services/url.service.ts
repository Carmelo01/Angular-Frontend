import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  url: string = 'http://localhost:8000/'
  //url: string = 'https://apicapsule.bjmpbaliwag.com/'
  constructor() { }
}
