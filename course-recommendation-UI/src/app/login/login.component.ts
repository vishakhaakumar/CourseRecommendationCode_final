import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/api";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {StudentDetailsService} from "../services/studentDetails.service";
import {GlobalConstants} from "../Common/GlobalConstants";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private studentDetailsService: StudentDetailsService, private global: GlobalConstants) { }

  registerNew : boolean = false;
  display: boolean = false;
  msgDisplay: boolean = false;
  loginMsgs: Message[] = [];
  loginDisplay: boolean = true;
  msgs: Message[] = [];
  credentials = {username: 'user', password: 'user1'};

  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  ngOnInit(): void {  }

  async handleLogin(form: NgForm) {
    this.username = form.value.username;
    this.password = form.value.password;
    this.loginService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      console.log("**********************LOGIN SUCCESSFUL HERE ******************************")
      console.log("global user name :: ", this.global.userId);
      this.callLogin();
    }, () => {
      console.log("**********************LOGIN FAILED HERE ******************************")
      this.invalidLogin = true;
      this.loginSuccess = false;
      form.reset();
      this.loginMsgs = [{severity: 'error', summary: 'Error', detail: 'Invalid Credentials!'}],
        setTimeout(() => {
          this.loginMsgs = [];
        }, 2000);
    });
  }

  async callLogin(){
    let studentId = await this.studentDetailsService.getStudentByUsername(this.username);
    let studentName = await this.studentDetailsService.getStudentName(this.username);
    console.log("**************************** logged in ******************************=====", this.username)
    console.log("**************************** logged in ******************************=====ID", parseInt(<string>studentId))
    console.log("**************************** logged in ******************************=====Name", studentName)
    this.global.userName = this.username;
    this.global.userId = parseInt(<string>studentId);
    this.global.StudentName = studentName;
    this.router.navigate(['/ProfilePage']);
  }

  async onLogin(form: NgForm){
    console.log("on ngSubmit click!!", form);
    let formLoginData = {
      'username': form.value.username,
      'password': form.value.password
    };
    console.log("on ngSubmit click data!!", formLoginData);

      let studentId = await this.studentDetailsService.getStudentByUsername(formLoginData.username);
      let studentName = await this.studentDetailsService.getStudentName(formLoginData.username);
      console.log("student name is ::: ", studentName);

      if (studentId == '0') {
        form.reset();
        this.loginMsgs = [{severity: 'error', summary: 'Error', detail: 'Invalid Credentials!'}],
          setTimeout(() => {
            this.loginMsgs = [];
          }, 2000);
      } else {
        //GlobalConstants.userId = parseInt(<string>studentId);
        this.global.userName = formLoginData.username;
        this.global.userId = parseInt(<string>studentId);
        this.global.userName = (<string>studentName);

        /* this.loginService.authenticate(this.credentials).subscribe(data =>{
             console.log("yes logged in ", data)
         })*/

        this.loginDisplay = false;
        this.router.navigate(['/ProfilePage']);
      }
    }

  onRegister() {
    this.display = true;
  }

  onCloseDialog() {
    this.display = false;
  }

  onRegSuccess() {
    this.display = false;
    this.msgDisplay= true;
    this.msgs = [{severity: 'success', summary: 'Success', detail: 'User Registered successfully!'}];
    setTimeout(()=>{
      this.msgs = [];
      this.msgDisplay= false;
    }, 2000);
  }

  onRegError() {
    this.display = false;
    this.msgDisplay= true;
    this.msgs = [{severity: 'error', summary: 'Error', detail: 'User already registered!'}];
    setTimeout(()=>{
      this.msgs = [];
      this.msgDisplay= false;
    }, 2000);
  }

  onMsgClose() {
    this.msgDisplay= false;
    this.msgs = [];
  }
}
