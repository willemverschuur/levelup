import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCreatepasswordComponent } from './page-createpassword.component';

describe('PageCreatepasswordComponent', () => {
  let component: PageCreatepasswordComponent;
  let fixture: ComponentFixture<PageCreatepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCreatepasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCreatepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
