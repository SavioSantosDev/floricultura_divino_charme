import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTextareaComponent } from './control-textarea.component';

describe('ControlTextareaComponent', () => {
  let component: ControlTextareaComponent;
  let fixture: ComponentFixture<ControlTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
