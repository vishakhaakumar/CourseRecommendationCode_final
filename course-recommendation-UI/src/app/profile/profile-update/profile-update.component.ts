import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Student} from "../../model/student.model";
import {Message} from "primeng/api";
import {StudentDetailsService} from "../../services/studentDetails.service";
import {Course} from "../../model/course.model";
import {GlobalConstants} from "../../Common/GlobalConstants";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  constructor(private studentDetailsService: StudentDetailsService, private global: GlobalConstants) { }
  display: boolean = false;
  msgDisplay: boolean = false;
  loginDisplay: boolean = true;
  @Input('studentItem') studentVal: Student;
  @Output() cancelUpdate = new EventEmitter<any>();
  @Output() studentRegistered = new EventEmitter<any>();
  @Output() errorRegistration = new EventEmitter<any>();
  student: Student;
  msgs: Message[] = [];
  mandatoryField : boolean = false;

  ngOnInit(): void { }

  onCancel(form: NgForm) {
    form.reset();
    this.cancelUpdate.emit();
  }

  async onUpdate(form: NgForm) {
    console.log("on ngSubmit clicked here!!", form);
    if (!form.value.firstname || !form.value.lastname || !form.value.email || !form.value.phoneNo || !form.value.semester) {
      this.mandatoryField = true;
    } else {
      let formStudData = {
        'studentId': this.global.userId,
        'firstName': form.value.firstname,
        'lastName': form.value.lastname,
        'address': form.value.address,
        'emailId': form.value.email,
        'phoneNumber': form.value.phoneNo,
        'semester': form.value.semester
      };
      let val = await this.studentDetailsService.updateStudent(formStudData);
      console.log('return val after all done !@@@@@@@!!!! ');
      if (val == true) {
        this.studentRegistered.emit();
      } else {
        this.errorRegistration.emit();
      }
    }
  }

  onCloseTab(){
    this.mandatoryField = false;
  }
}
