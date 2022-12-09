import {AfterViewInit , Component, OnInit} from '@angular/core';
import { History } from "../model/history.model";
import { CourseHistoryService } from "../services/courseHistory.service";
import {Message} from "primeng/api";
import {Course} from "../model/course.model";
import {CourseDetailsService} from "../services/courseDetails.service";
import { CourseFeedback } from '../model/courseFeedback.model';
import {CourseFeedbackService} from "../services/courseFeedback.service";
import {GlobalConstants} from "../Common/GlobalConstants";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit  {

  constructor(private courseHistoryService: CourseHistoryService, private courseService: CourseDetailsService,
              private courseFeedbackService: CourseFeedbackService, private global: GlobalConstants) { }

  history: History[];
  filteredCourses: any[] = [];
  sem1courses: History[] =[];
  sem2courses: History[] =[];
  sem3courses: History[] =[];

  display: boolean = false;
  feedback: boolean = false;
  feedDisplay: boolean = false;

  selectedCourse: Course;
  courseFeedback: CourseFeedback;

  feedbackMsgs: Message[] = [];

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log('after view init')
    this.filteredCourses = [];
    this.getFilteredCourses();
  }

  async getFilteredCourses(){
    this.filteredCourses = await this.courseHistoryService.getCourseHistory();
    await this.sortCourses(this.filteredCourses);
  }

  async sortCourses(filteredCourses : any){
    filteredCourses.get(1);
    console.log('sem 1 course here after filter and sort =============', filteredCourses.get(1));
    console.log('sem 2 course here after filter and sort =============', filteredCourses.get(2));
    console.log('sem 3 course here after filter and sort =============', filteredCourses.get(3));
    this.sem1courses= filteredCourses.get(1);
    this.sem2courses= filteredCourses.get(2);
    this.sem3courses= filteredCourses.get(3);
    console.log('sem 1 course length =============',  this.sem1courses.length);
    console.log('sem 2 course length =============',  this.sem2courses.length);
    console.log('sem 3 course length =============',  this.sem3courses.length);
  }

  async onCourseDetails(courseId: number) {
    console.log('called by the history event emitter - course selected',courseId);
    this.display = true;
    this.selectedCourse = await this.courseService.getSingleCourseDetails(courseId);
      console.log('course value here ---------------->>>>>>>',this.selectedCourse.courseName);
  }

  onCloseDialog() {
    this.display = false;
  }

  async onFeedback(courseId: number) {
    this.feedback = true;
    this.selectedCourse = await this.courseService.getSingleCourseDetails(courseId);
    console.log('courseFeedback value here ---------------->>>>>>>',this.selectedCourse.courseName);
    console.log('courseFeedback value here ---------------->>>>>>>',this.selectedCourse.courseId);
    console.log('courseFeedback value here ---------------->>>>>>>',this.global.userId);
    this.courseFeedback = await this.courseFeedbackService.getCourseFeedback(this.global.userId,courseId);
  }

  onFeedbackSuccess() {
    this.feedback = false;
    this.feedDisplay = true;
    this.feedbackMsgs = [{severity: 'success', summary: 'Success', detail: 'Feedback Submitted successfully!'}];
    setTimeout(()=>{
       this.feedDisplay = false;
     }, 2000);
  }

  onFeedbackError() {
    this.feedback = false;
    this.feedDisplay = true;
    this.feedbackMsgs = [{severity: 'error', summary: 'Error', detail: 'Feedback Submission Error!'}];
    setTimeout(()=>{
      this.feedDisplay = false;
    }, 2000);
  }

  onMsgClose() {
    this.feedDisplay = false;
  }

  onCloseDialogFeedback() {
    this.feedback = false;
  }
}
