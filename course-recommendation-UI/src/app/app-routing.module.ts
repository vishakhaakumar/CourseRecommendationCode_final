import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseDashboardComponent } from "./course-dashboard/course-dashboard.component";
import { HistoryComponent } from "./history/history.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterCourseComponent } from "./register-course/register-course.component";
import {LoginComponent} from "./login/login.component";
import {RecommendationsComponent} from "./recommendations/recommendations.component";
import {StatsComponent} from "./stats/stats.component";

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'LoginPage', component: LoginComponent},
  {path: 'RegisterPage', component: RegisterCourseComponent},
  {path: 'DetailsPage', component: CourseDashboardComponent},
  {path: 'HistoryPage', component: HistoryComponent},
  {path: 'RecommendationPage', component: RecommendationsComponent},
  {path: 'ProfilePage', component: ProfileComponent},
  {path: 'StatsPage', component: StatsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
