import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SelectItemPage } from './select-item.page';

describe('SelectItemPage', () => {
  let component: SelectItemPage;
  let fixture: ComponentFixture<SelectItemPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(SelectItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
