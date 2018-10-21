import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCourseComponent } from './page-course.component';

describe('PageCourseComponent', () => {
  let component: PageCourseComponent;
  let fixture: ComponentFixture<PageCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
