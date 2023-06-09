import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { ngxCsv } from 'ngx-csv';
import { CapsuleService } from './capsule.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient,
    public urlService: UrlService) { }

  exportCapsule(data:any, title: any, name: any){
    let capsuleData: any[] = []
    for(let f of data){
      let subdata = {
        title: f.title,
        author: f.user.fname + ' ' + f.user.lname,
        authorEmail: f.user.email,
        date: this.formatReqDate(f.created_at),
        status: this.getStatus(f.status),
      }
      capsuleData.push(subdata)
    }
    let options = {
      title: title,
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle:false,
      useBom: false,
      headers: ['Title', 'Author', 'Author Email', 'Date Published', 'Status']
    }

    new ngxCsv(capsuleData, name, options);
  }

  exportFaculty(data:any, title: any, name: any){
    let facultyData: any[] = []
    for(let f of data){
      let subdata = {
        fname: f.fname,
        mname: f.mname,
        lname: f.lname,
        email: f.email,
        contact: f.contact,
        created_at: this.formatReqDate(f.created_at)
      }
      facultyData.push(subdata)
    }
    let options = {
      title: title,
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle:false,
      useBom: false,
      headers: ['First Name', 'Middle Name', 'Last Name', 'Email', 'Contact', 'Date Registered']
    }
    new ngxCsv(facultyData, name, options);
  }

  exportRubric(data:any){
    let rubricData: any[] = []
    for(let f of data){
      let title = {
        category: f.title
      }
      rubricData.push(title);
      for(let c of f.rubric){
        let rubric = {
          space: '',
          rubric: c.rubric
        }
        rubricData.push(rubric)
      }
    }
    let options = {
      title: "Rubrics List",
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle:false,
      useBom: false,
      headers: ['Rubric Categories', 'Rubric Components']
    }

    new ngxCsv(rubricData, "rubrics-list", options);
  }

  exportReviewCapsule(data:any, title: any, name: any){
    let capsuleData: any[] = []
    for(let f of data){
      let subdata = {
        title: f.capsule.title,
        author: f.capsule.user.fname + ' ' + f.capsule.user.lname,
        authorEmail: f.capsule.user.email,
        date: this.formatReqDate(f.capsule.created_at),
        status: this.getStatus(f.capsule.status),
      }
      capsuleData.push(subdata)
    }
    let options = {
      title: title,
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle:false,
      useBom: false,
      headers: ['Title', 'Author', 'Author Email', 'Date Published', 'Status']
    }
  new ngxCsv(capsuleData, name, options);
  }

  exportGradedRubric(data:any, user: any){
    let rubricData: any[] = []
    for(let f of data.data){
      let subdata = {
        title: f.category,
        rubric: f.rubric,
        space: '',
        grade: f.grade
      }
      rubricData.push(subdata)
    }
    let options = {
      title: "Graded Rubrics",
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      noDownload: false,
      showTitle:false,
      useBom: false,
      headers: ['Rubric Categories', 'Rubric Components', '', 'Grade']
    }

    new ngxCsv(rubricData, "Graded Rubrics", options);
  }

  exportpdfGradedCapsule(data: any, user: any){
    const rubricData = data.data
    const grade = data.grade
    const tableDiv = document.createElement('div');
    tableDiv.innerHTML = `
      <div class="header"><img src="assets/exportpdfHeader.png" style="width: 100%;" /></div>
      <div class="username" style="text-align:center;">
        <h3>Graded Rubrics</h3>
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
        <th>CATEGORY</th>
        <th>RUBRIC</th>
        <th>GRADE</th>
      </thead>
    `
    const tbody = document.createElement('tbody')
    rubricData.forEach((user: any) => {
      const tr = document.createElement('tr')
      tr.innerHTML = `
      <tr [ngClass]="theme+'-faculty-tr'">
        <td data-label="FIRST NAME">${user.category}</td>
        <td data-label="MIDDLE NAME">${user.rubric}</td>
        <td data-label="LAST NAME">${user.grade}</td>
      </tr>`
      tbody.appendChild(tr.cloneNode(true))
    })

    const p = document.createElement('p')
      p.innerHTML = `
        <p style="float: right; margin: 20px 10% 0 0">Total Grade Percentage: ${grade.grade}%</p>
      `
    const footerdiv = document.createElement('div');
    footerdiv.innerHTML = `
    <div class="footer" style="position:relative; text-align:right; right:10px; margin:10% 10% 0 0">
      <span>Created on: ${new Date().toLocaleString()}</span>
    </div> `;
    table.appendChild(tbody.cloneNode(true))
    table.classList.add('pdf-table')
    tableDiv.appendChild(table.cloneNode(true))
    tableDiv.appendChild(p.cloneNode(true))
    tableDiv.appendChild(footerdiv.cloneNode(true));
    const options = {
      filename: 'graded-rubric.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait' },
      multipage: true
    };
    html2pdf().set(options).from(tableDiv).save();
    //console.log(rubricData, grade)
  }

  getStatus(status: any){
    if(status == 0){ return 'Unassigned'}
    else if(status == 1){ return 'Assigned'}
    else if(status == 2){ return 'Graded'}
    else if(status == 3){ return 'Under Revision'}
    else if(status == 4){ return 'Reconsider'}
    else if(status == 5){ return 'Approved'}
    else if(status == 6){ return 'Submitted to RIO'}
    else {return null}
  }

  formatReqDate(dateReq: Date){
    return formatDate(dateReq, 'yyyy-MM-dd', 'en_PH')
  }

  dateNow(){
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Add 1 because JavaScript months are zero-based
    const day = now.getDate();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate
  }
}
