import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePaygateComponent } from './page-paygate.component';

describe('PagePaygateComponent', () => {
  let component: PagePaygateComponent;
  let fixture: ComponentFixture<PagePaygateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePaygateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePaygateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
