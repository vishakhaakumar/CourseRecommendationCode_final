import { HttpClient } from "@angular/common/http";
import {Injectable, EventEmitter } from "@angular/core";
import {GlobalConstants} from "../Common/GlobalConstants";
import {CourseDetails} from "../model/course-details";
import {map, Observable} from "rxjs";
import {CourseReg} from "../model/course-reg.model";
import {StudentDetailsService} from "./studentDetails.service";

@Injectable()
export class LoginService {

  constructor(private studentDetailsService: StudentDetailsService, private http: HttpClient, private global: GlobalConstants) {
  }

  alreadyRegistered: boolean;

  public username: String;
  public password: String;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  authenticationService(username: String, password: String) {
    console.log('login auth service called');
    return this.http.get(`http://localhost:8082/student/login`,
      { headers: { authorization: this.createBasicAuthToken(username, password),
          'Access-Control-Allow-Origin': '*' } }).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  async registerSuccessfulLogin(username, password) {
    console.log("**************************** logged in ******************************")
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
    this.global.userName = null;
    this.global.userId = null;
    this.global.userName = null;
    console.log("**************************** logged out ******************************")
    return 'logged out';
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
   let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }
}
