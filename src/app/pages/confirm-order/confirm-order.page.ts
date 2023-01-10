import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Payment } from 'src/app/services/model';
import { OrderService } from 'src/app/services/order.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.page.html',
  styleUrls: ['./confirm-order.page.scss'],
})
export class ConfirmOrderPage implements OnInit {

  public data = {
    idParam: undefined,
    cart: undefined as (Cart | undefined),
  }

  constructor(activatedRoute: ActivatedRoute, private orderSvc: OrderService, private utl: UtilService, private router: Router) {
    activatedRoute.params.subscribe((params: any) => {
      this.data.idParam = params.id;
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.doFetch();
  }

  public async doFetch() {
    await this.utl.doInLoading(`Loading cart`, async () => {
      this.data.cart = await this.orderSvc.getCart(parseInt(this.data.idParam || '-1'));
      if (undefined === this.data.cart) {
        this.data.cart = await this.orderSvc.newOrder();
      }
    });
  }

  /**
   * onConfirm
   */
  public async onConfirm() {
    const done = await this.utl.doInLoading(`Confirming order`, async () => {
      await this.utl.snooze();
      let done = false;
      if (this.data.cart) {
        done = await this.orderSvc.confirm(this.data.cart.id);
      }
      this.utl.presentToast(done ? 'Order confirmed' : 'Failed to confirm order');
      return true;
    });
    if (true === done) {
      await this.orderSvc.newOrder();
      this.router.navigate([`/tabs`]);
    }
  }

}