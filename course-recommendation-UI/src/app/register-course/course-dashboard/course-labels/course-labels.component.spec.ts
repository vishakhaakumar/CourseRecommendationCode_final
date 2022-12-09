import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLabelsComponent } from './course-labels.component';

describe('CourseLabelsComponent', () => {
  let component: CourseLabelsComponent;
  let fixture: ComponentFixture<CourseLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
