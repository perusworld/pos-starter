import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/services/model';
import { OrderService } from 'src/app/services/order.service';
import { UtilService } from 'src/app/services/util.service';
import { NEW_ORDER } from '../order-details/order-details.page';

@Component({
  selector: 'app-orders-tab',
  templateUrl: './orders-tab.page.html',
  styleUrls: ['./orders-tab.page.scss'],
})
export class OrdersTabPage implements OnInit {
  public data = {
    orders: [] as Order[]
  }

  constructor(private orderSvc: OrderService, private utl: UtilService, private router: Router) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.doFetch();
  }

  public async doFetch() {
    await this.utl.doInLoading(`Loading orders`, async () => {
      const orders = await this.orderSvc.orders();
      this.data.orders = orders || [];
    });
  }

  /**
   * newOrder
   */
  public async newOrder() {
    this.router.navigate([`/order-details/${NEW_ORDER}`]);
  }

  /**
   * currentOrder
   */
  public async currentOrder() {
    const cart = await this.orderSvc.currentOrder();
    this.router.navigate([`/order-details/${cart.id}`]);
  }
}
