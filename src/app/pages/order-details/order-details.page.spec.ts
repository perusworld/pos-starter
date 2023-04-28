import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderDetailsPage } from './order-details.page';

describe('OrderDetailsPage', () => {
  let component: OrderDetailsPage;
  let fixture: ComponentFixture<OrderDetailsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(OrderDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
