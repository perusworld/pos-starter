import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SalesTabPage } from './sales-tab.page';

describe('SalesTabPage', () => {
  let component: SalesTabPage;
  let fixture: ComponentFixture<SalesTabPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(SalesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
