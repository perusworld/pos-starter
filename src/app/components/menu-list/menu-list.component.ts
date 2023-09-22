import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuItem } from 'src/app/services/model';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, MenuItemComponent],
})
export class MenuListComponent  implements OnInit {

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
