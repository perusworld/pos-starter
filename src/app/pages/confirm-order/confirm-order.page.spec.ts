import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfirmOrderPage } from './confirm-order.page';

describe('ConfirmOrderPage', () => {
  let component: ConfirmOrderPage;
  let fixture: ComponentFixture<ConfirmOrderPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(ConfirmOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
