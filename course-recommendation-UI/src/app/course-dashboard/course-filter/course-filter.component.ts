import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CourseDetails} from "../../model/course-details";

@Component({
  selector: 'app-course-filter',
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.css']
})
export class CourseFilterComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
        if(this.filterVals){
          formFilterParams: {};
          this.filterVals = false;
        }
    }

  ngOnInit(): void {
    console.log('init called now her why!!!')
  }

  @Output('filterApplied') filterApplied = new EventEmitter<any>();
  @Output('filterCancelled') filterCancelled = new EventEmitter<any>();
  @Output('filterReset') filterReset = new EventEmitter<any>();
  Rating: number[] = [1,2,3,4,5];
  Workload: number[] = [1,2,3,4,5,6,7,8,9,10];
  JobRole: string[] = ['Software Engineer','Test Engineer','Front-End Engineer','Back-End Engineer','Full Stack Engineer','DevOps Engineer'];
  Term: string[] = ['Fall','Winter','Summer'];
  CourseType: string[] = ['online','hybrid','in-person'];
  ratingVal: number;
  workloadVal: number;
  jobRoleVal: string;
  termVal: string;
  courseTypeVal: string;
  formFilterParams: {};
  @Input('filterValues') filterVals : boolean;

  changeRating(e: any) {
    console.log('value here is ------------>>>>>', e.target.value);
    if(e.target.value ==="Select Rating"){
      console.log('value here is ------------>>>>>Rating', this.Rating);
      this.formFilterParams = {...this.formFilterParams, 'rating': this.Rating};
      console.log('value here is ------------>>>>>this.formFilterParams ', this.formFilterParams);
    }else {
      this.ratingVal = e.target.value;
      this.formFilterParams = {...this.formFilterParams, 'rating': this.ratingVal};
    }
  }
  changeWorkload(e: any) {
    this.workloadVal = e.target.value;
    this.formFilterParams = {...this.formFilterParams, 'workload': this.workloadVal};
  }
  changeJobRole(e: any) {
    this.jobRoleVal = e.target.value;
    this.formFilterParams = {...this.formFilterParams, 'jobRole': this.jobRoleVal};
  }
  changeTerm(e: any) {
    this.termVal = e.target.value;
    this.formFilterParams = {...this.formFilterParams, 'term': this.termVal};
  }
  changeCourseType(e: any) {
    this.courseTypeVal = e.target.value;
    this.formFilterParams = {...this.formFilterParams, 'courseType': this.courseTypeVal};
  }

  onFilterApplied(form: NgForm) {
    console.log("on ngSubmit click!!", form);
    /*let formFilterParams = {
      'rating': this.ratingVal,
      'jobRole': this.jobRoleVal,
      'workload': this.workloadVal,
      'term': this.termVal,
      'courseType': this.courseTypeVal
    };*/
    this.filterApplied.emit(this.formFilterParams);
  }

  onCancel(val: any) {
    this.filterCancelled.emit();
  }

  onReset(val: any) {
    this.formFilterParams={};
    this.filterReset.emit();
  }
}
