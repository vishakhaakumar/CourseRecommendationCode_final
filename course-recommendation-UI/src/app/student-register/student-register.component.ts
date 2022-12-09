import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentDetailsService } from "../services/studentDetails.service";
import { Student } from "../model/student.model";
import {Message} from "primeng/api";

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  constructor(private studentDetailsService: StudentDetailsService) { }
  @Output() closeDialog = new EventEmitter<any>();
  @Output() studentRegistered = new EventEmitter<any>();
  @Output() errorRegistration = new EventEmitter<any>();
  student: Student;
  msgs: Message[] = [];
  validateEmail = true;
  mandatoryField : boolean = false;

  ngOnInit(): void { }

  onClose() {
    this.closeDialog.emit();
  }

  async onRegister(form: NgForm) {
    console.log("on ngSubmit click!!", form);
    if(!form.value.firstname||!form.value.lastname||!form.value.email||!form.value.phoneNo||!form.value.semester||!form.value.major){
      this.mandatoryField = true;
    }else {
      let stud = await this.studentDetailsService.getStudentByUsername(form.value.email);
      if (stud == 0) {
        let studID = await this.studentDetailsService.getMaxStudentID();
        console.log("on max id!!", studID);
        let formStudData = {
          'studentId': studID,
          'firstName': form.value.firstname,
          'lastName': form.value.lastname,
          'address': form.value.address,
          'emailId': form.value.email,
          'phoneNumber': form.value.phoneNo,
          'semester': form.value.semester,
          'majorId': form.value.major
        };
        let val = await this.studentDetailsService.registerNewStudent(formStudData);
        console.log('return val after all done !@@@@@@@!!!! ', val);
        if (val == true) {
          this.studentRegistered.emit();
        } else {
          this.errorRegistration.emit();
        }
      } else {
        this.errorRegistration.emit();
      }
    }
  }

  onReset(form: NgForm){
    form.reset();
  }

  onCancel(form: NgForm) {
    form.reset();
    this.closeDialog.emit();
  }

  onCloseTab(){
    this.mandatoryField = false;
  }
}
