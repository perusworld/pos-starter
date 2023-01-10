import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/services/model';
import { OrderService } from 'src/app/services/order.service';
import { UtilService } from 'src/app/services/util.service';

export const NEW_ORDER = 'new-order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

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
    if (NEW_ORDER === this.data.idParam) {
      await this.utl.doInLoading(`Initializing cart`, async () => {
        this.data.cart = await this.orderSvc.newOrder();
      });
    } else {
      await this.utl.doInLoading(`Loading cart`, async () => {
        this.data.cart = await this.orderSvc.getCart(parseInt(this.data.idParam || '-1'));
        if (undefined === this.data.cart) {
          this.data.cart = await this.orderSvc.newOrder();
        }
      });
    }
  }

  /**
   * onAdd
   */
  public async onAdd() {
    this.router.navigate([`/select-item/${this.data.cart?.id}`]);
  }

  /**
   * onPayment
   */
  public async onPayment() {
    this.router.navigate([`/pay-order/${this.data.cart?.id}`]);
  }

  /**
   * onClear
   */
  public async onClear() {
    this.data.cart = await this.orderSvc.newOrder();
  }

}
