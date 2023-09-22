import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuTabPage } from './menu-tab.page';

describe('MenuTabPage', () => {
  let component: MenuTabPage;
  let fixture: ComponentFixture<MenuTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
