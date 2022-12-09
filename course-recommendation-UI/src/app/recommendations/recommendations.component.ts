import { Recommendation } from "../model/recommendation.model";
import { Component, OnInit } from '@angular/core';
import {RecommendationsService} from "../services/recommendations.service";
import {CourseDetails} from "../model/course-details";
import {CourseReg} from "../model/course-reg.model";
import {Message} from "primeng/api";
import {Course} from "../model/course.model";
import {CourseDetailsService} from "../services/courseDetails.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  constructor(private recommendationService: RecommendationsService, private courseService: CourseDetailsService) { }
  recommendations: Recommendation[];
  recommendedCourseDetails: CourseDetails[];
  courseDetails: CourseDetails[];
  msgs: Message[] = [];
  display: boolean = false;
  filter: boolean = false;
  filterReset: boolean = false;
  selectedCourse: Course;

  //for pagination:
  pageSizeOptions: number[] = [8];
  pagedList: CourseDetails[]= [];
  courseList: CourseDetails[]= [];
  length: number = 0;
  pageSize: number = 8;
  pageEvent: PageEvent;

  ngOnInit(): void {

    this.recommendationService.getRecommendationIds()
      .subscribe(dataIds =>{
        console.log('recommendations ids are -------> ',dataIds);
        this.recommendationService.getRecommendationDetails(dataIds)
          .subscribe(courseDetails =>{
            console.log('recommended course details are -------> ',courseDetails);
            this.recommendedCourseDetails = courseDetails;
            this.courseDetails = courseDetails;
          })
      })
  }

  onCourseAdded(courseAdded: CourseReg) {
    console.log('called by the event emitter - course added',courseAdded);
    this.msgs = [{severity: 'success', summary: 'Added', detail: 'course has been added for registration'}];
    setTimeout(()=>{
      this.msgs = [];
    }, 2000);
  }

  async onCourseSelected(courseId: number) {
    console.log('called by the history event emitter - course selected',courseId);
    this.display = true;
    this.selectedCourse = await this.courseService.getSingleCourseDetails(courseId);
    console.log('course value here ---------------->>>>>>>',this.selectedCourse.courseName);
  }

  onCloseDialog() {
    this.display = false;
  }

  async onAddFilters() {
    this.filter = true;
  }

  onFilterApply(filterParams: any) {
    console.log('filter params from filter comp to course dashboard', filterParams);
    this.filter = false;
    this.recommendedCourseDetails= this.courseDetails.filter(function(item) {
      for (var key in filterParams) {
        if (item[key] === undefined || item[key] != filterParams[key]) {
          return false;
        }
      }
      return true;
    });
    this.pagedList = this.recommendedCourseDetails.slice(0, 8);
    this.length = this.recommendedCourseDetails.length;
  }

  onFilterCancel() {
    this.filter = false;
  }

  onResetFilters() {
    this.recommendedCourseDetails= this.courseDetails;
    this.filterReset = true;
    this.pagedList = this.recommendedCourseDetails.slice(0, 8);
    this.length = this.recommendedCourseDetails.length;
  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.recommendedCourseDetails.slice(startIndex, endIndex);
  }
}
