import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/services/model';
import { OrderService } from 'src/app/services/order.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class OrderSummaryPage implements OnInit {

  public data = {
    idParam: undefined,
    cart: undefined as (Cart | undefined),
  }

  constructor(activatedRoute: ActivatedRoute, private orderSvc: OrderService, private utl: UtilService,
    private router: Router, private ctx: StorageService) {
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
   * onEmailReceipt
   */
  public async onEmailReceipt(email: string) {
    const done = await this.utl.doInLoading(`Emailing receipt`, async () => {
      await this.utl.snooze();
      return true;
    });
    this.utl.presentToast(done ? 'Email sent' : 'Failed to send email');
  }

  /**
   * onContinue
   */
  public async onContinue() {
    this.router.navigate([await this.utl.routeFor(this.ctx)]);
  }

}
