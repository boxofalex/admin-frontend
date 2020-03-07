import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBlockModalComponent } from './create-block-modal.component';

describe('CreateBlockModalComponent', () => {
  let component: CreateBlockModalComponent;
  let fixture: ComponentFixture<CreateBlockModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBlockModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBlockModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
