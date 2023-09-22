import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Order } from 'src/app/services/model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class OrdersListComponent  implements OnInit {

  @Input() orders: Order[] = [];
  @Output() onNewOrder = new EventEmitter();
  @Output() onShowCart = new EventEmitter();

  constructor(public utl: UtilService) { }

  ngOnInit() { }

  /**
   * callNewOrder
   */
  public async callNewOrder() {
    this.onNewOrder.emit();
  }

  /**
   * callCart
   */
  public async callCart() {
    this.onShowCart.emit();
  }


}
