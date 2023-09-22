import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MenuItem } from 'src/app/services/model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class MenuItemComponent  implements OnInit {

  @Input() menuItem: MenuItem | undefined;
  @Input() showDelete: boolean = false;
  @Input() showAddToCard: boolean = false;

  @Output() onDelete = new EventEmitter<MenuItem>();
  @Output() onAdd = new EventEmitter<MenuItem>();

  constructor() { }

  ngOnInit() {}

  /**
   * doDelete
   */
  public async doDelete() {
    this.onDelete.emit(this.menuItem)
  }

  /**
   * doAdd
   */
  public async doAdd() {
    this.onAdd.emit(this.menuItem)
  }

}
