import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {CourseHistoryService} from "../services/courseHistory.service";
import { StudentDets } from "../model/studentDets.model";
import {Subscription} from "rxjs";
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  courses: StudentDets[];
  showTable: boolean = false;
  dataval: any;
  chartOptions: any;
  subscription: Subscription;
  //config: AppConfig
  showPie: boolean = false;

  constructor(private courseHistoryService: CourseHistoryService) { }

  ngOnInit(): void {
    this.dataval = {
      labels: ['Sem 1','Sem 2','Sem 3','Sem 4'],
      datasets: [
        {
          data: [30, 40, 20, 10],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#FF0078"
          ],
          hoverBackgroundColor: [
            "#64B5F6",
            "#81C784",
            "#FFB74D",
            "#F976B3"
          ]
        }
      ]
    };
  }

  async onSubmit(form: NgForm) {
    console.log("on ngSubmit click!!", form.value.courseId);
    let courseId: number = form.value.courseId;
    await this.courseHistoryService.getStudentDets(courseId).subscribe(data=>
      this.courses = data
    );
    this.showTable = true;

    console.log("returned course vals ------>>>>> !!", this.courses);
  }

  showPiechart(){
    this.showPie = true;
  }

  onClose() {
    this.showPie = false;
  }
}
