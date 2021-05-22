import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationButtonBaseComponent } from './pagination-button-base.component';

describe('PaginationButtonBaseComponent', () => {
  let component: PaginationButtonBaseComponent;
  let fixture: ComponentFixture<PaginationButtonBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationButtonBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationButtonBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
