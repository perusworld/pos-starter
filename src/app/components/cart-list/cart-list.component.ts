import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Cart } from 'src/app/services/model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CartListComponent  implements OnInit {

  @Input() cart: Cart | undefined;
  @Input() showButtons: boolean = true;
  @Input() showTotal: boolean = true;
  @Output() onAdd = new EventEmitter();
  @Output() onPayment = new EventEmitter();
  @Output() onClear = new EventEmitter();

  public currency = environment.currency;

  constructor() { }

  ngOnInit() { }

  /**
   * callAdd
   */
  public async callAdd() {
    this.onAdd.emit()
  }

  /**
   * callPayment
   */
  public async callPayment() {
    this.onPayment.emit()
  }

  /**
   * callClear
   */
  public async callClear() {
    this.onClear.emit()
  }


}
