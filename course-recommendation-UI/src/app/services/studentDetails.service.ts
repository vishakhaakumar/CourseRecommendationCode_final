import { Student } from "../model/student.model";
import { HttpClient } from "@angular/common/http";
import {Injectable, EventEmitter } from "@angular/core";
import {GlobalConstants} from "../Common/GlobalConstants";

@Injectable()
export class StudentDetailsService {

  constructor(private http: HttpClient, private global: GlobalConstants) {
  }

  async registerNewStudent(student: any) {
    console.log('data before sending is ===============>>>>', student);
    return this.http.post('http://localhost:8082/users/new', student).toPromise();
  }

  async getStudentByUsername(username: string){
    console.log('username before sending is ===============>>>>', username);
    //return this.http.get('http://localhost:8082/login/student/'+username).toPromise();
    return this.http.get('http://localhost:8082/users/byUsername/'+username).toPromise();
  }
  //get max studentID to auto generate next ID
  async getMaxStudentID(){
    return this.http.get('http://localhost:8082/users/maxStudID').toPromise();
  }

  async getStudentName(username: string){
    console.log('username before sending is ===============>>>>', username);
    return this.http.get('http://localhost:8082/users/namebyEmail/'+username,{responseType: 'text'}).toPromise();
  }

  getStudentDetails() {
    console.log('user ID value here is vish ===============>>>>', this.global.userId);
    return this.http.get<Student>('http://localhost:8082/users/byId/'+this.global.userId);
  }

  async updateStudent(student: any) {
    console.log('data before sending for update is ===============>>>>', student);
    return this.http.put('http://localhost:8082/users/update/'+this.global.userId, student).toPromise();
  }
}
