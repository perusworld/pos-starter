import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu, MenuItem } from 'src/app/services/model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {

  @Input() menu: MenuItem[][] = [];
  @Input() public showDelete: boolean = false;
  @Input() public showAddToCard: boolean = false;

  @Output() onDelete = new EventEmitter<MenuItem>();
  @Output() onAdd = new EventEmitter<MenuItem>();

  constructor() { }

  ngOnInit() { }

  /**
   * doDelete
   */
  public async doDelete(menuItem: MenuItem) {
    this.onDelete.emit(menuItem)
  }

  /**
   * doAdd
   */
  public async doAdd(menuItem: MenuItem) {
    this.onAdd.emit(menuItem)
  }

}
