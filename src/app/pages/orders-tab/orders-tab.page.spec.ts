import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrdersTabPage } from './orders-tab.page';

describe('OrdersTabPage', () => {
  let component: OrdersTabPage;
  let fixture: ComponentFixture<OrdersTabPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(OrdersTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
