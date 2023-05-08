import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class PaginateService {

  constructor(private http: HttpClient,
    public urlService: UrlService,
    private token: TokenService) { }



  sort(headerName:String, capsules:any) {
    //Date Published sorting
    if (headerName == 'datePublsihedAsc') {
      capsules = capsules.sort((a: any, b: any) => {
        let dateA = new Date(a.created_at);
        let dateB = new Date(b.created_at);
        return dateA.getTime() - dateB.getTime();
      })
    } else if (headerName == 'datePublsihedDesc') {
      capsules = capsules.sort((a: any, b: any) => {
        let dateA = new Date(a.created_at);
        let dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      })
    }
    //Title sorting
    if (headerName == 'titleAsc') {
      capsules = capsules.sort((a: any, b: any) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }else if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    //Author name Sorting
    if (headerName == 'titleDesc') {
      capsules = capsules.sort((a: any, b: any) => {
        if (b.title.toLowerCase() < a.title.toLowerCase()) {
          return -1;
        }else if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return 1;
        }else {
          return 0;
        }
      });
    }
    if (headerName == 'authorAsc') {
      capsules.sort((a: any, b: any) => {
        const aName = a.user.fname + ' ' + a.user.lname;
        const bName = b.user.fname + ' ' + b.user.lname;
        if (aName.toLowerCase() < bName.toLowerCase()) {
          return -1;
        } else if (aName.toLowerCase() > bName.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (headerName == 'authorDesc') {
      capsules.sort((a: any, b: any) => {
        const aName = a.user.fname + ' ' + a.user.lname;
        const bName = b.user.fname + ' ' + b.user.lname;
        if (bName.toLowerCase() < aName.toLowerCase()) {
          return -1;
        } else if (bName.toLowerCase() > aName.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (headerName == 'fnameAsc') {
      capsules.sort((a: any, b: any) => {
        if (a.fname.toLowerCase() < b.fname.toLowerCase()) {
          return -1;
        } else if (a.fname.toLowerCase() > b.fname.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (headerName == 'fnameDesc') {
      capsules.sort((a: any, b: any) => {
        if (b.fname.toLowerCase() < a.fname.toLowerCase()) {
          return -1;
        } else if (b.fname.toLowerCase() > a.fname.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (headerName == 'lnameAsc') {
      capsules.sort((a: any, b: any) => {
        if (a.lname.toLowerCase() < b.lname.toLowerCase()) {
          return -1;
        } else if (a.lname.toLowerCase() > b.lname.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (headerName == 'lnameDesc') {
      capsules.sort((a: any, b: any) => {
        if (b.lname.toLowerCase() < a.lname.toLowerCase()) {
          return -1;
        } else if (b.lname.toLowerCase() > a.lname.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  review_sort(headerName:String, capsules:any){
    if (headerName == 'datePublsihedAsc') {
      capsules = capsules.sort((a: any, b: any) => {
        let dateA = new Date(a.capsule.created_at);
        let dateB = new Date(b.capsule.created_at);
        return dateA.getTime() - dateB.getTime();
      })
    } else if (headerName == 'datePublsihedDesc') {
      capsules = capsules.sort((a: any, b: any) => {
        let dateA = new Date(a.capsule.created_at);
        let dateB = new Date(b.capsule.created_at);
        return dateB.getTime() - dateA.getTime();
      })
    }
    //Title sorting
    if (headerName == 'titleAsc') {
      capsules = capsules.sort((a: any, b: any) => {
        if (a.capsule.title.toLowerCase() < b.capsule.title.toLowerCase()) {
          return -1;
        }else if (a.capsule.title.toLowerCase() > b.capsule.title.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    //Author name Sorting
    if (headerName == 'titleDesc') {
      capsules = capsules.sort((a: any, b: any) => {
        if (b.capsule.title.toLowerCase() < a.capsule.title.toLowerCase()) {
          return -1;
        }else if (b.capsule.title.toLowerCase() > a.capsule.title.toLowerCase()) {
          return 1;
        }else {
          return 0;
        }
      });
    }
    if (headerName == 'authorAsc') {
      capsules.sort((a: any, b: any) => {
        const aName = a.capsule.user.fname + ' ' + a.capsule.user.lname;
        const bName = b.capsule.user.fname + ' ' + b.capsule.user.lname;
        if (aName.toLowerCase() < bName.toLowerCase()) {
          return -1;
        } else if (aName.toLowerCase() > bName.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    if (headerName == 'authorDesc') {
      capsules.sort((a: any, b: any) => {
        const aName = a.capsule.user.fname + ' ' + a.capsule.user.lname;
        const bName = b.capsule.user.fname + ' ' + b.capsule.user.lname;
        if (bName.toLowerCase() < aName.toLowerCase()) {
          return -1;
        } else if (bName.toLowerCase() > aName.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
}
