import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Course} from "../../model/course.model";
import { CourseReg } from "../../model/course-reg.model";
import {CourseDetailsService} from "../../services/courseDetails.service";
import {ConfirmationService, Message} from "primeng/api";
import {Observable} from "rxjs";
import {GlobalConstants} from "../../Common/GlobalConstants";
import {CourseDetails} from "../../model/course-details";

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
  providers: [ConfirmationService]
})
export class CourseItemComponent implements OnInit {

  constructor(private courseService: CourseDetailsService, private confirmationService: ConfirmationService, private global: GlobalConstants) { }

  @Input('courseItem') courseVal: CourseDetails;
  @Output() courseRemoved = new EventEmitter<CourseReg[]>();
  @Output() courseAdded = new EventEmitter<CourseReg>();
  @Output() courseSelected = new EventEmitter<number>();


  msgPopup: boolean= false;
  msgs: Message[] = [];
  courseReg: CourseReg;
  numberOfCourses: number;
  alreadyRegistered: boolean;
  previousHistory: boolean;

  ngOnInit(): void {
    console.log("courseVal: ", this.courseVal)
  }

  async onAddToRegistration(courseId: number) {
    console.log('chosen courseId is ======= -->', courseId);
    this.alreadyRegistered = await this.courseService.checkIfRegistered(courseId);
    console.log('alreadyRegistered -->', this.alreadyRegistered);
    if(this.alreadyRegistered){
      this.msgPopup = true;
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'course already registered!'}];
      setTimeout(()=>{
        this.msgs = [];
        this.msgPopup = false;
      }, 3000);
      return;
    }

    this.previousHistory = await this.courseService.checkPreviouslyRegistered(courseId);
    console.log('previousHistory -->', this.previousHistory);
    if(this.previousHistory){
      this.msgPopup = true;
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'course taken in previous semesters!'}];
      setTimeout(()=>{
        this.msgs = [];
        this.msgPopup = false;
      }, 3000);
      return;
    }
    //if both checks satisfy then confirm add
    this.numberOfCourses = await this.courseService.getNoCoursesRegistered();
    console.log('number of courses registered is -> ', this.numberOfCourses);
    if(this.numberOfCourses>=4){
      this.msgPopup = true;
      this.msgs = [{severity: 'error', summary: 'Error', detail: 'You have already registered for 4 courses. Course Limit is 4!'}];
      setTimeout(()=>{
        this.msgs = [];
        this.msgPopup = false;
      }, 3000);
      return;
    }
    this.confirmAddCourse();
  }

  confirmAddCourse() {
    console.log('clicked ', this.courseVal);
      this.confirmationService.confirm({
      message: 'Add this course for registration?',
      accept: () => {
        this.courseReg = new CourseReg(this.courseVal.courseId,this.global.userId, this.courseVal.courseName);
        this.courseService.addToRegistration(this.courseReg);
        this.courseAdded.emit(this.courseReg);
      }
    });
  }

  onRemoveRegistration() {
    console.log('clicked ', this.courseVal);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this course?',
      accept: () => {
        //Actual logic to perform a confirmation
          this.courseReg = new CourseReg(this.courseVal.courseId,this.global.userId, this.courseVal.courseName);
          this.courseService.removeRegistration(this.courseReg.studentId, this.courseReg.courseId)
          .subscribe(res=>{
            this.courseService.getAllCourseRegistered().subscribe(data => {
              console.log('called 1111',data);
              this.courseRemoved.emit(data);
            });
          });
      } //end of accept
    });
  }// end of remove registration

  showDetails() {
    this.courseSelected.emit(this.courseVal.courseId);
  }
}
