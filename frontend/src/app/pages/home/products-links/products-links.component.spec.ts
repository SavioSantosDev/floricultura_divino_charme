import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsLinksComponent } from './products-links.component';

describe('ProductsLinksComponent', () => {
  let component: ProductsLinksComponent;
  let fixture: ComponentFixture<ProductsLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
