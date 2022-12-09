import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../Common/GlobalConstants";
import {Course} from "../model/course.model";
import { CourseFeedback } from "../model/courseFeedback.model";

@Injectable()
export class CourseFeedbackService {
  constructor(private http: HttpClient, private global: GlobalConstants) {
  }

  async getCourseFeedback(studentId: number, courseId: number): Promise<CourseFeedback>{
    let data = await this.http.get<CourseFeedback>('http://localhost:8081/courses/feedback/student/'+studentId+'/course/'+ courseId).toPromise();
    return data;
  }

  async addCourseFeedback(courseFeedback: any) {
    console.log('feedback before sending is ===============>>>>', courseFeedback);
    return this.http.post('http://localhost:8081/courses/feedback/new', courseFeedback).toPromise();
  }
}
