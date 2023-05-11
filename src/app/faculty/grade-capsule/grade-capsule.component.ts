import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CapsuleService } from 'src/app/services/capsule.service';
import { UrlService } from 'src/app/services/url.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { MatRadioModule } from '@angular/material/radio';
import { RubricService } from 'src/app/services/rubric.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grade-capsule',
  templateUrl: './grade-capsule.component.html',
  styleUrls: ['./grade-capsule.component.scss']
})
export class GradeCapsuleComponent implements OnInit {
  capsuleId: any;
  selectedCapsuleData: any = null;
  fileurl: any;
  urlmain: any;
  commentRubrics: any;
  loading: boolean = false

  showdetails : boolean = false;
  categories: any;
  rubricData: any;
  selectedOption: any;

  capsule_type: any;


  constructor(public generalService: GeneralService,
    private capsuleService: CapsuleService,
    private dialogRef: MatDialog,
    private activatedRoute: ActivatedRoute,
    public urlService: UrlService,
    private rubricService: RubricService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.capsuleId = param.get('id');
    });
    this.capsuleService.getOneCapsule(this.capsuleId).subscribe(capsule => {
      this.selectedCapsuleData = capsule.data[0];
      this.capsule_type = capsule.data[0].capsule_type

      this.fileurl=this.urlService.url+capsule.data[0].file_path;
      this.capsuleService.getFile(capsule.data[0].file_path).subscribe(data=>{
        this.urlmain = data;
      })
    })
    this.getCategory()
  }

  onSubmit(){
    let capsuledata = {
      data: this.selectedValues,
      comment: this.commentRubrics
    }
    this.capsuleService.gradeCapsule(capsuledata, this.capsuleId).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.toastr.success("Graded Successfully!");
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }

  getCategory(){
    this.categories = this.rubricService.getCategory().subscribe(category => {
      this.categories = category.data
    })
  }

  seeDetails(){
    this.showdetails = !this.showdetails;
  }

  selectedValues: any[] = [];
  updateValue(questionId: number, rubric: string, value: number) {
    const index = this.selectedValues.findIndex(item => item.rubricId === questionId);
    const obj = { rubricId: questionId, rubric: rubric, grade: value };
    if (index > -1) {
      this.selectedValues[index] = obj;
    } else {
      this.selectedValues.push(obj);
    }
  }
  // selectedValues: any[] = []; // Updated to be a one-dimensional array

  // updateValue(questionId: number, rubric: string, value: number, categoryId: number) {
  //   const categoryIndex = this.selectedValues.findIndex(item => item.categoryId === categoryId);

  //   // Create the object for the question
  //   const questionObj = { questionId: questionId, rubric: rubric, grade: value };

  //   if (categoryIndex > -1) {
  //     // Category exists in the selectedValues array
  //     const category = this.selectedValues[categoryIndex];
  //     const questionIndex = category.questions.findIndex((item: any) => item.questionId === questionId);

  //     if (questionIndex > -1) {
  //       // Update existing question object
  //       category.questions[questionIndex] = questionObj;
  //     } else {
  //       // Add new question object to existing category
  //       category.questions.push(questionObj);
  //     }
  //   } else {
  //     // Category does not exist in the selectedValues array
  //     const newCategory = {
  //       categoryId: categoryId,
  //       questions: [questionObj]
  //     };
  //     this.selectedValues.push(newCategory);
  //   }

  //   console.log(this.selectedValues);
  // }
  openPdf() {
    this.capsuleService.getFile(this.selectedCapsuleData.file_path).subscribe(data=>{
       // Create a blob object from the ArrayBuffer data
      const blob = new Blob([data], { type: 'application/pdf' });

      // Create a URL for the blob object
      const url = URL.createObjectURL(blob);

      // Open the URL in a new tab
      window.open(url, '_blank');
    })
  }


}
