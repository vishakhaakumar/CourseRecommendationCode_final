import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { History } from "../../model/history.model";

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent implements OnInit {

  constructor() { }
  @Input('historyItem') history: History;
  @Output() courseDetails = new EventEmitter<number>();
  @Output() courseFeedback = new EventEmitter<number>();

  ngOnInit(): void {
    console.log("history: ", this.history)
  }

  showDetails() {
    this.courseDetails.emit(this.history.courseId);
  }

  addFeedback() {
    this.courseFeedback.emit(this.history.courseId);
  }
}

