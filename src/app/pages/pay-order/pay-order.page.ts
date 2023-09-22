import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, Payment } from 'src/app/services/model';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-pay-order',
  templateUrl: './pay-order.page.html',
  styleUrls: ['./pay-order.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class PayOrderPage implements OnInit {

  public data = {
    idParam: undefined,
    cart: undefined as (Cart | undefined),
    cardInput: false,
    cardTap: false,
    scanPay: false,
}

  constructor(activatedRoute: ActivatedRoute, private orderSvc: OrderService, private utl: UtilService, 
    private router: Router, public ctx: StorageService) {
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
   * onPayment
   */
  public async onPayment(payment: Payment) {
    const done = await this.utl.doInLoading(`Validating payment`, async () => {
      await this.utl.snooze();
      let done = false;
      if (this.data.cart) {
        done = await this.orderSvc.setPayment(this.data.cart.id, payment);
      }
      this.utl.presentToast(done ? 'Payment validated' : 'Failed to validate payment');
      return done;
    });
    if (true === done) {
      this.router.navigate([`/confirm-order/${this.data.cart?.id}`]);
    }
  }

}
