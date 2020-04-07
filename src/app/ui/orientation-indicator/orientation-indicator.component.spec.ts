import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientationIndicatorComponent } from './orientation-indicator.component';

describe('OrientationIndicatorComponent', () => {
  let component: OrientationIndicatorComponent;
  let fixture: ComponentFixture<OrientationIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrientationIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrientationIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
