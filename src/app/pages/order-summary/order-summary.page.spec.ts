import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderSummaryPage } from './order-summary.page';

describe('OrderSummaryPage', () => {
  let component: OrderSummaryPage;
  let fixture: ComponentFixture<OrderSummaryPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(OrderSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
