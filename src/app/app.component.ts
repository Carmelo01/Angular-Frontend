import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  currentUser: any;
  tokenGet: any;
  constructor (private token: TokenService){}
  ngOnInit(): void {
    this.tokenGet = this.token.get()
    if(this.tokenGet){
      if(this.tokenGet.role == "admin"){
        this.token.adminMe().subscribe({
          next: data => this.currentUser = data,
          error: error => this.handleError(error)
        })
      } else {
        this.token.me().subscribe({
          next: data => this.currentUser = data,
          error: error => this.handleError(error)
        })
      }
    }
  }
  handleError(error: any){
    this.token.remove();
    window.location.reload();
  }
}
