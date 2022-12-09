import { Recommendation } from "../model/recommendation.model";
import { HttpClient } from "@angular/common/http";
import {Injectable, EventEmitter } from "@angular/core";
import {GlobalConstants} from "../Common/GlobalConstants";
import {CourseDetails} from "../model/course-details";

@Injectable()
export class RecommendationsService {

  constructor(private http: HttpClient, private global: GlobalConstants) {
  }

  getCourseDetails() {
    return this.http.get<CourseDetails[]>('http://localhost:8081/courses/all');
  }

  getRecommendations() {
    return this.http.get<Recommendation[]>('http://192.168.1.21:8092/recommendations');
  }

  getRecommendationIds() {
    return this.http.get<number[]>('http://127.0.0.1:8094/recommendationsIds/'+this.global.userId);
  }

  getRecommendationDetails(courseIds: number[]) {
    return this.http.get<CourseDetails[]>('http://localhost:8081/recommendations/byIds/'+courseIds);
  }
}
