import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RubricService } from 'src/app/services/rubric.service';

@Component({
  selector: 'app-add-rubrics',
  templateUrl: './add-rubrics.component.html',
  styleUrls: ['./add-rubrics.component.scss']
})
export class AddRubricsComponent implements OnInit{

  values: any = [];
  loading: boolean = false;
  titleId: any;
  selectedTitle: any;

  constructor(private rubricService: RubricService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.titleId = param.get('id');
    });
    this.getCategoryData()
    this.values.push({value: ""});
  }

  getCategoryData(){
    this.selectedTitle = this.rubricService.getOneCategory(this.titleId).subscribe(title => {
      this.selectedTitle = title.data[0];
    })
  }

  removeValue(i: any){
    this.values.splice(i,1);
  }

  addValue(){
    this.values.push({value: ""});
  }

  onSubmit(){
    this.loading = true
    this.rubricService.addRubric(this.values, this.titleId).subscribe({
      next: data => this.handleResponse(data),
      error: error => this.handleError(error)
    })
  }

  handleResponse(data: any){
    this.loading = false;
    this.toastr.success("Added Successfully!");
    this.router.navigateByUrl('/admin/rubrics');
  }

  handleError(error: any){
    this.toastr.warning(error.error.error);
    this.loading = false;
  }
}
