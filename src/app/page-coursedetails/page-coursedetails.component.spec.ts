import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCoursedetailsComponent } from './page-coursedetails.component';

describe('PageCoursedetailsComponent', () => {
  let component: PageCoursedetailsComponent;
  let fixture: ComponentFixture<PageCoursedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCoursedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCoursedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
