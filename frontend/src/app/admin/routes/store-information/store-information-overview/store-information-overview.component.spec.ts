import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInformationOverviewComponent } from './store-information-overview.component';

describe('StoreInformationOverviewComponent', () => {
  let component: StoreInformationOverviewComponent;
  let fixture: ComponentFixture<StoreInformationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInformationOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreInformationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
