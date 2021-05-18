import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProductCardComponent } from './public-product-card.component';

describe('PublicProductCardComponent', () => {
  let component: PublicProductCardComponent;
  let fixture: ComponentFixture<PublicProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
