import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {AccordionModule} from 'primeng/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HeaderComponent } from './header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';
import {MatPaginatorModule} from '@angular/material/paginator';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
// import { CalendarModule } from 'primeng/calendar';
import {ChartModule} from 'primeng/chart';

import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {ImageModule} from 'primeng/image';
import { SplitterModule } from 'primeng/splitter';
import {ListboxModule} from 'primeng/listbox';
import {SplitButtonModule} from 'primeng/splitbutton';

import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {RippleModule} from 'primeng/ripple';
import {OverlayPanelModule} from 'primeng/overlaypanel';

import {
  IgxButtonModule,
  IgxIconModule,
  IgxCardModule,
  IgxRippleModule
} from "igniteui-angular";

import { TabMenuModule } from 'primeng/tabmenu';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { CourseItemComponent } from './course-dashboard/course-item/course-item.component';
import {CourseDetailsService} from "./services/courseDetails.service";
import {CourseHistoryService} from "./services/courseHistory.service";
import { HistoryItemComponent } from './history/history-item/history-item.component';
import { CourseLabelsComponent } from './register-course/course-dashboard/course-labels/course-labels.component';
import { CourseDetailsComponent } from './course-dashboard/course-details/course-details.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import {StudentDetailsService} from "./services/studentDetails.service";
import { ProfileUpdateComponent } from './profile/profile-update/profile-update.component';
import {GlobalConstants} from "./Common/GlobalConstants";
import { CourseFeedbackComponent } from './course-dashboard/course-feedback/course-feedback.component';
import {CourseFeedbackService} from "./services/courseFeedback.service";
import { CourseFilterComponent } from './course-dashboard/course-filter/course-filter.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import {RecommendationsService} from "./services/recommendations.service";
import {LoginService} from "./services/login.service";
import {HttpInterceptorService} from "./services/HttpInterceptorService.service";
import { StatsComponent } from './stats/stats.component';


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    HeaderComponent,
    RegisterCourseComponent,
    CourseDashboardComponent,
    CourseItemComponent,
    HistoryComponent,
    HistoryItemComponent,
    CourseLabelsComponent,
    CourseDetailsComponent,
    LoginComponent,
    StudentRegisterComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    CourseFeedbackComponent,
    CourseFilterComponent,
    RecommendationsComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TableModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    AutoCompleteModule,
    ImageModule,
    SplitterModule,
    ListboxModule,
    SplitButtonModule,
    AppRoutingModule,
    PanelMenuModule,
    RouterTestingModule,
    TabMenuModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    CardModule,
    CarouselModule,
    RippleModule,
    OverlayPanelModule,
    MatCardModule,
    MatGridListModule,
    MessageModule,
    MessagesModule,
    IgxButtonModule,
    IgxIconModule,
    IgxCardModule,
    IgxRippleModule,
    MatPaginatorModule,
    ChartModule
  ],
  providers: [CourseDetailsService,CourseHistoryService,StudentDetailsService,
    GlobalConstants,CourseFeedbackService,RecommendationsService,LoginService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
