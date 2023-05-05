import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  // template: `
  // <img [src]="gifUrl" alt="Loading..." width="85px">
  // <div class="bg"></div>
  // `,
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent {
   gifUrl = '../../../assets/loader.gif';
  constructor() {
    const timestamp = new Date().getTime();
    this.gifUrl = `${this.gifUrl}?t=${timestamp}`;
  }
}

