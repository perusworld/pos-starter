import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayOrderPage } from './pay-order.page';

describe('PayOrderPage', () => {
  let component: PayOrderPage;
  let fixture: ComponentFixture<PayOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PayOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
