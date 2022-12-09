import { History } from "../model/history.model";
import { StudentDets } from "../model/studentDets.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Course} from "../model/course.model";
import {GlobalConstants} from "../Common/GlobalConstants";
import {Student} from "../model/student.model";

@Injectable()
export class CourseHistoryService{

  constructor(private http: HttpClient, private global: GlobalConstants) {
  }
  //filteredCourses: any[];
  filterCourses: any[];

  async getCourseHistory(): Promise<any>{
    let data= await this.http.get<History[]>('http://localhost:8081/courses/history/'+this.global.userId+'/all').toPromise();
    console.log('step 1', data);
    let filteredCourses = this.filterCoursesBySem(data);
    return filteredCourses;
  }

   getStudentDets(courseId: number) {
    let data= this.http.get<StudentDets[]>('http://localhost:8081/courses/studDets/course/'+courseId);
    return data;
  }

  filterCoursesBySem(courseHistory: History[]){
    let sem1courses: History[]=[];
    let sem2courses: History[]=[];
    let sem3courses: History[]=[];
    let courseMap = new Map<number, History[]>();
    for(let i=0; i<courseHistory.length;i++) {
      if(courseHistory[i].semester == 1) {
        sem1courses.push(courseHistory[i]);
      }
    }
    //return this.sem1courses;
    for(let i=0; i<courseHistory.length;i++) {
      if(courseHistory[i].semester == 2) {
        sem2courses.push(courseHistory[i]);
      }
    }
    for(let i=0; i<courseHistory.length;i++) {
      if(courseHistory[i].semester == 3) {
        sem3courses.push(courseHistory[i]);
      }
    }

    courseMap.set(1,sem1courses);
    courseMap.set(2,sem2courses);
    courseMap.set(3,sem3courses);
    return courseMap;
  }
}
