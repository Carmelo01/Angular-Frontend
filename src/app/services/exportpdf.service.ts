import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import html2pdf from 'html2pdf.js'
import { ExportService } from './export.service';

@Injectable({
  providedIn: 'root'
})
export class ExportpdfService {

  constructor(public urlService: UrlService,
    private exportService: ExportService) { }

  exportPdfCapsule(title: any, data:any, type: any, filename: string){
    const titleData = title
    const recievedData = data
    const fileData = filename
    const typeData = type
    const tableDiv = document.createElement('div');
    tableDiv.innerHTML = `
      <div class="header"><img src="assets/exportpdfHeader.png" style="width: 100%;" /></div>
      <div class="username" style="text-align:center;">
        <h3> ${titleData}</h3>
      </div>
      <style>
        .pdf-table {
          opacity: 1;
          width:80% !important;
          background-color: transparent;
          border-collapse: collapse;
          margin: 5% 10% 0 10% !important;
          text-align: center;
        }
        .pdf-table tbody th,
        .pdf-table tbody td {
          background-color: #fff;
          border: 1px solid black;
          font-size:14px;
          width:5%;
        }
      </style>
    `;
    const table = document.createElement('table')
    if(typeData == 'capsule'){
      table.innerHTML=`
        <thead>
          <th>CAPSULE ID</th>
          <th>TITLE</th>
          <th>DATE SUBMITTED</th>
          <th>STATUS</th>
        </thead>
      `
    } else if (typeData == 'review'){
      table.innerHTML=`
        <thead>
          <th>CAPSULE ID</th>
          <th>TITLE</th>
          <th>AUTHOR NAME</th>
          <th>AUTHOR EMAIL</th>
          <th>DATE SUBMITTED</th>
          <th>STATUS</th>
        </thead>
      `
    }
    const tbody = document.createElement('tbody')
    recievedData.forEach((capsule: any) => {
      const tr = document.createElement('tr')
      if(typeData == 'capsule'){
        tr.innerHTML = `
        <tr [ngClass]="theme+'-faculty-tr'">
          <td data-label="CAPSULE ID">${capsule.id}</td>
          <td data-label="TITLE">${capsule.title}</td>
          <td data-label="DATE SUBMITTED">${this.exportService.formatReqDate(capsule.created_at)}</td>
          <td data-label="Status">${this.exportService.getStatus(capsule.status)}</td>
        </tr>`
        tbody.appendChild(tr.cloneNode(true))
      } else if (typeData == 'review'){
        tr.innerHTML = `
        <tr [ngClass]="theme+'-faculty-tr'">
          <td data-label="CAPSULE ID">${capsule.capsule.id}</td>
          <td data-label="TITLE">${capsule.capsule.title}</td>
          <td data-label="AUTHOR NAME">${capsule.capsule.user.fname} ${capsule.capsule.user.mname} ${capsule.capsule.user.lname}</td>
          <td data-label="AUTHOR EMAIL">${capsule.capsule.user.email}</td>
          <td data-label="DATE SUBMITTED">${this.exportService.formatReqDate(capsule.capsule.created_at)}</td>
          <td data-label="Status">${this.exportService.getStatus(capsule.capsule.status)}</td>
        </tr>`
        tbody.appendChild(tr.cloneNode(true))
      }
    })
    const footerdiv = document.createElement('div');
    footerdiv.innerHTML = `
    <div class="footer" style="position:relative; text-align:right; right:10px; margin:10% 10% 0 0">
      <span>Created on: ${new Date().toLocaleString()}</span>
    </div> `;
    table.appendChild(tbody.cloneNode(true))
    table.classList.add('pdf-table')
    tableDiv.appendChild(table.cloneNode(true))
    tableDiv.appendChild(footerdiv.cloneNode(true));
    const options = {
      filename: fileData,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' },
      multipage: true
    };
    html2pdf().set(options).from(tableDiv).save();
  }

  exportPdfFaculty(title: any, data:any, filename: string){
    const titleData = title
    const recievedData = data
    const fileData = filename
    const tableDiv = document.createElement('div');
    tableDiv.innerHTML = `
      <div class="header"><img src="assets/exportpdfHeader.png" style="width: 100%;" /></div>
      <div class="username" style="text-align:center;">
        <h3> ${titleData}</h3>
      </div>
      <style>
        .pdf-table {
          opacity: 1;
          width:80% !important;
          background-color: transparent;
          border-collapse: collapse;
          margin: 5% 10% 0 10% !important;
          text-align: center;
        }
        .pdf-table tbody th,
        .pdf-table tbody td {
          background-color: #fff;
          border: 1px solid black;
          font-size:14px;
          width:5%;
        }
      </style>
    `;
    const table = document.createElement('table')
    table.innerHTML=`
      <thead>
        <th>FIRST NAME</th>
        <th>MIDDLE NAME</th>
        <th>LAST NAME</th>
        <th>EMAIL</th>
        <th>CONTACT</th>
      </thead>
    `
    const tbody = document.createElement('tbody')
    recievedData.forEach((user: any) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
      <tr [ngClass]="theme+'-faculty-tr'">
        <td data-label="FIRST NAME">${user.fname}</td>
        <td data-label="MIDDLE NAME">${user.mname}</td>
        <td data-label="LAST NAME">${user.lname}</td>
        <td data-label="EMAIL">${user.email}</td>
        <td data-label="CONTACT">${user.contact}</td>
      </tr>`
      tbody.appendChild(tr.cloneNode(true))
    })
    const footerdiv = document.createElement('div');
    footerdiv.innerHTML = `
    <div class="footer" style="position:relative; text-align:right; right:10px; margin:10% 10% 0 0">
      <span>Created on: ${new Date().toLocaleString()}</span>
    </div> `;
    table.appendChild(tbody.cloneNode(true))
    table.classList.add('pdf-table')
    tableDiv.appendChild(table.cloneNode(true))
    tableDiv.appendChild(footerdiv.cloneNode(true));
    const options = {
      filename: fileData,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' },
      multipage: true
    };
    html2pdf().set(options).from(tableDiv).save();
  }

}
