import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageResetpasswordComponent } from './page-resetpassword.component';

describe('PageResetpasswordComponent', () => {
  let component: PageResetpasswordComponent;
  let fixture: ComponentFixture<PageResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
