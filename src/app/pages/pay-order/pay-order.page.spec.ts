import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PayOrderPage } from './pay-order.page';

describe('PayOrderPage', () => {
  let component: PayOrderPage;
  let fixture: ComponentFixture<PayOrderPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(PayOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
