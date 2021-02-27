import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInformationBaseComponent } from './store-information-base.component';

describe('StoreInformationBaseComponent', () => {
  let component: StoreInformationBaseComponent;
  let fixture: ComponentFixture<StoreInformationBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInformationBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInformationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
