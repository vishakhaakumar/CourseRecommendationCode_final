import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseReg} from "../../../model/course-reg.model";
import {Course} from "../../../model/course.model";
import {CourseDetailsService} from "../../../services/courseDetails.service";
import {ConfirmationService, Message, MessageService} from "primeng/api";


@Component({
  selector: 'app-course-labels',
  templateUrl: './course-labels.component.html',
  styleUrls: ['./course-labels.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class CourseLabelsComponent implements OnInit {

  constructor(private courseService: CourseDetailsService, private confirmationService: ConfirmationService) { }

  @Input('coursereg') courseReg: CourseReg;
  @Output() courseRemoved = new EventEmitter<CourseReg[]>();
  @Output() courseSelected = new EventEmitter<number>();

  ngOnInit(): void {  }

  onRemoveRegistration() {
    console.log('clicked 11 ', this.courseReg);
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove this course?',
      accept: () => {
        //Actual logic to perform a confirmation
          this.courseService.removeRegistration(this.courseReg.studentId, this.courseReg.courseId)
            .subscribe(res=>{
              this.courseService.getAllCourseRegistered().subscribe(data => {
                console.log('called 00000000',data);
                this.courseRemoved.emit(data);
              });
            });
      } //end of accept
    });
  }// end of remove registration


  onDetails() {
    this.courseSelected.emit(this.courseReg.courseId);
  }
}
