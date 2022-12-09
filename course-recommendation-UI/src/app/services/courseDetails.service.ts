import { Course } from "../model/course.model";
import { CourseReg } from "../model/course-reg.model";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import {Injectable, EventEmitter } from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {GlobalConstants} from "../Common/GlobalConstants";
import {CourseDetails} from "../model/course-details";

@Injectable()
export class CourseDetailsService {

  constructor(private http: HttpClient, private global: GlobalConstants) {
  }

  alreadyRegistered: boolean;

  getCourseDetails() {
    return this.http.get<CourseDetails[]>(`http://localhost:8081/courses/all`);
  }

  getAvailableCourseDetails() {
    return this.http.get<CourseDetails[]>('http://localhost:8081/courses/available/all'+ this.global.userId);
  }

  async getSingleCourseDetails(courseId: number): Promise<Course>{
    let data = await this.http.get<CourseDetails>(`http://localhost:8081/courses/byId/`+ courseId).toPromise();
    return data;
  }

  addToRegistration(addCourse: CourseReg){
     this.http.post('http://localhost:8081/courses/reg/',addCourse).subscribe(response => console.log(response));
  }

  removeRegistration(studentId: number, courseId: number) {
    return this.http.delete('http://localhost:8081/courses/reg/delete/student/' + studentId + '/course/' + courseId);
  }

  getAllCourseRegistered() {
    return this.http.get<CourseReg[]>('http://localhost:8081/courses/reg/all/'+this.global.userId);
  }

  async getNoCoursesRegistered(): Promise<number>{
    let data = await this.http.get<number>('http://localhost:8081/courses/reg/all/number/'+this.global.userId).toPromise();
    return data;
  }

  async checkIfRegistered(courseId: number): Promise<boolean>{
    let data = await this.http.get<boolean>('http://localhost:8081/courses/reg/student/'+this.global.userId+'/course/'+courseId).toPromise();
    return data;
  }

  async checkPreviouslyRegistered(courseId: number): Promise<boolean>{
    let data = this.http.get<boolean>('http://localhost:8081/courses/history/student/'+this.global.userId+'/course/'+courseId).toPromise();
    return data;
  }
}
