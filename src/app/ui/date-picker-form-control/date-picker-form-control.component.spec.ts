import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerFormControlComponent } from './date-picker-form-control.component';

describe('DatePickerFormControlComponent', () => {
  let component: DatePickerFormControlComponent;
  let fixture: ComponentFixture<DatePickerFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
