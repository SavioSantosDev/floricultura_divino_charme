import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorMsgComponent } from './control-error-msg.component';

describe('ControlErrorMsgComponent', () => {
  let component: ControlErrorMsgComponent;
  let fixture: ComponentFixture<ControlErrorMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlErrorMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlErrorMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
