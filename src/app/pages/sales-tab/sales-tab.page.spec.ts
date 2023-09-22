import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesTabPage } from './sales-tab.page';

describe('SalesTabPage', () => {
  let component: SalesTabPage;
  let fixture: ComponentFixture<SalesTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
