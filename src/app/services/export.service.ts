import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
        title: f.rubric.category.title,
        rubric: f.rubric.rubric,
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

  getStatus(status: any){
    if(status == 0){ return 'Unassigned'}
    else if(status == 1){ return 'Assigned'}
    else if(status == 2){ return 'Graded'}
    else if(status == 3){ return 'Under Revision'}
    else if(status == 4){ return 'Rejected'}
    else if(status == 5){ return 'Approved'}
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
