import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Course } from "../model/course.model";
import { CourseReg } from "../model/course-reg.model";
import { CourseDetailsService } from "../services/courseDetails.service";
import {Message} from "primeng/api";
import {CourseDetails} from "../model/course-details";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.css']
})
export class CourseDashboardComponent implements OnInit {

  constructor(private courseService: CourseDetailsService) { }

  //@Output('filterReset') filterReset = new EventEmitter<any>();
  display: boolean = false;
  filter: boolean = false;
  filterReset: boolean = false;
  msgs: Message[] = [];
  courses: Course[];
  courseDetails: CourseDetails[];
  allCourses: CourseDetails[];
  selectedCourse: Course;

  //for pagination:
  pageSizeOptions: number[] = [8];
  pagedList: CourseDetails[]= [];
  courseList: CourseDetails[]= [];
  length: number = 0;
  pageSize: number = 8;
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.courseService.getCourseDetails()
      .subscribe(data => { this.courseDetails = data;
                                this.allCourses = data;
        console.log('length of data is ------->>',this.length);
        this.pagedList = this.courseDetails.slice(0, 8);
        this.length = this.courseDetails.length;
        console.log('length of data is ------->>',this.length);
        console.log('pagedList data is ------->>',this.pagedList);
                              });

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
    this.courseDetails= this.allCourses.filter(function(item) {
                              for (var key in filterParams) {
                                if(filterParams[key]!= "select value") {
                                  if (item[key] === undefined || item[key] != filterParams[key]) {
                                    return false;
                                  }
                                }
                            }
                            return true;
                          });
    this.pagedList = this.courseDetails.slice(0, 8);
    this.length = this.courseDetails.length;
  }

  onFilterCancel() {
    this.filter = false;
  }

  onResetFilters() {
    this.courseDetails= this.allCourses;
    //this.filterReset.emit();
    this.filterReset = true;
    this.pagedList = this.courseDetails.slice(0, 8);
    this.length = this.courseDetails.length;

  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.courseDetails.slice(startIndex, endIndex);
  }

  onFilterReset() {
    this.courseDetails= this.allCourses;
    this.filterReset = true;
    this.pagedList = this.courseDetails.slice(0, 8);
    this.length = this.courseDetails.length;
    this.filter = false;
  }
}
