import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from "../../model/course.model";
import { CourseFeedback } from "../../model/courseFeedback.model";
import {NgForm} from "@angular/forms";
import {CourseFeedbackService} from "../../services/courseFeedback.service";
import {GlobalConstants} from "../../Common/GlobalConstants";

@Component({
  selector: 'app-course-feedback',
  templateUrl: './course-feedback.component.html',
  styleUrls: ['./course-feedback.component.css']
})
export class CourseFeedbackComponent implements OnInit {

  constructor(private courseFeedbackService: CourseFeedbackService, private global: GlobalConstants) { }
  @Input('course') selectedCourse: Course;
  @Input('feedback') courseFeedback: CourseFeedback;

  @Output() closeDialog = new EventEmitter();
  @Output() closeDialogFeedback = new EventEmitter();


  @Output() feedbackSubmitted = new EventEmitter<any>();
  @Output() errorFeedback = new EventEmitter<any>();

  Rating: number[] = [1,2,3,4,5];
  Workload: number[] = [1,2,3,4,5,6,7,8,9,10];
  JobRole: string[] = ['Software Engineer','Test Engineer','Front-End Engineer','Back-End Engineer','Full Stack Engineer','DevOps Engineer'];
  ratingVal: number;
  workloadVal: number;
  jobRoleVal: string;


  ngOnInit(): void { }

  onCloseDialog() {
    this.closeDialog.emit();
  }

  onReset(form: NgForm){
    console.log("on reset click!!", form);
    form.reset();
  }

  onCancel(form: NgForm) {
    form.reset();
    this.closeDialogFeedback.emit();
  }

  changeRating(e: any) {
    this.ratingVal = e.target.value;
  }
  changeWorkload(e: any) {
    this.workloadVal = e.target.value;
  }
  changeJobRole(e: any) {
    this.jobRoleVal = e.target.value;
  }

  async onSubmitFeedback(form: NgForm) {
    console.log("on ngSubmit click!!", form);
    let formFeedbackData = {
      'studentId': this.global.userId,
      'courseId': this.selectedCourse.courseId,
      'rating': this.ratingVal,
      'jobRole': this.jobRoleVal,
      'workload': this.workloadVal
    };

      let feedback = await this.courseFeedbackService.addCourseFeedback(formFeedbackData);
      if(feedback == true){
          this.feedbackSubmitted.emit();
        }else{
          this.errorFeedback.emit();
        }
      }
}
