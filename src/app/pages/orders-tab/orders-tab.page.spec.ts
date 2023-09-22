import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersTabPage } from './orders-tab.page';

describe('OrdersTabPage', () => {
  let component: OrdersTabPage;
  let fixture: ComponentFixture<OrdersTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdersTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
