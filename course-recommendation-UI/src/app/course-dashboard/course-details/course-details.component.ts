import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Course} from "../../model/course.model";
import {CourseDetailsService} from "../../services/courseDetails.service";

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private courseService: CourseDetailsService) { }

  @Input('course') selectedCourse: Course;
  @Output() closeDialog = new EventEmitter();

  ngOnInit(): void { }

  onCloseDialog() {
        this.closeDialog.emit();
  }
}
