import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {History} from "../model/history.model";
import {CourseReg} from "../model/course-reg.model";
import {CourseHistoryService} from "../services/courseHistory.service";
import {CourseDetailsService} from "../services/courseDetails.service";
import {ConfirmationService, Message, MessageService} from "primeng/api";
import {Course} from "../model/course.model";

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.css'],
  providers: [MessageService]
})
export class RegisterCourseComponent implements OnInit, OnChanges {

  constructor(private courseHistoryService: CourseHistoryService, private courseDetailsService: CourseDetailsService,
              private messageService: MessageService) {
  }

  display: boolean = false;
  selectedCourse: Course;

  ngOnChanges(): void {

    this.courseDetailsService.getAllCourseRegistered().subscribe(data => {
      this.courseReg = data;
    });
    }

  msgs: Message[] = [];
  history: History[];
  courseReg: CourseReg[];

  ngOnInit(): void {

    this.courseDetailsService.getAllCourseRegistered().subscribe(data => {
      this.courseReg = data;
    });
  }

  onRemoveCourse(courseRefresh: CourseReg[]) {
    console.log('called by the event emitter',courseRefresh);
    this.courseReg = courseRefresh;
    this.msgs = [{severity: 'success', summary: 'Removed', detail: 'course has been removed from the registration'}];
      setTimeout(()=>{
        this.msgs = [];
      }, 3000);
  }

  async onShowDetails(courseId: number){
    console.log('called by the history event emitter - course selected',courseId);
    this.display = true;
    this.selectedCourse = await this.courseDetailsService.getSingleCourseDetails(courseId);
    console.log('course value here ---------------->>>>>>>',this.selectedCourse.courseName);
  }

  onCloseDialog() {
    this.display = false;
  }
}
