import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student.model';
import {Message} from "primeng/api";
import {StudentDetailsService} from "../services/studentDetails.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private studentDetailsService: StudentDetailsService){ }

  student: Student;
  display: boolean = false;
  registerNew : boolean = false;
  msgDisplay: boolean = false;
  loginDisplay: boolean = true;
  msgs: Message[] = [];

  ngOnInit(): void {
    this.studentDetailsService.getStudentDetails()
      .subscribe(data => { this.student = data});
  }

  onUpdate() {
    this.display = true;
  }

  async onRegSuccess() {
    this.display = false;
    this.msgDisplay = true;
    this.msgs = [{severity: 'success', summary: 'Success', detail: 'User Registered successfully!'}];
    await this.studentDetailsService.getStudentDetails()
      .subscribe(data => { this.student = data});
    /* setTimeout(()=>{
       this.msgs = [];
     }, 2000);*/
  }

  onRegError() {
    this.display = false;
    this.msgDisplay= true;
    this.msgs = [{severity: 'error', summary: 'Error', detail: 'User already registered!'}];
    /*setTimeout(()=>{
      this.msgs = [];
    }, 2000);*/
  }

  oncancelUpdate() {
    this.display = false;
    this.studentDetailsService.getStudentDetails()
      .subscribe(data => { this.student = data});
  }
}
