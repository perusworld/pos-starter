import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, MenuItem } from 'src/app/services/model';
import { OrderService } from 'src/app/services/order.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.page.html',
  styleUrls: ['./select-item.page.scss'],
})
export class SelectItemPage implements OnInit {

  public data = {
    idParam: undefined,
    cart: undefined as (Cart | undefined),
    menu: [] as MenuItem[][],
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
    await this.utl.doInLoading(`Loading menu and cart items`, async () => {
      this.data.cart = await this.orderSvc.getCart(parseInt(this.data.idParam || '-1'));
      if (undefined === this.data.cart) {
        this.data.cart = await this.orderSvc.newOrder();
      }
      const menu = await this.orderSvc.menu();
      this.data.menu = this.orderSvc.group(menu?.menu);
    });
  }

  /**
   * doDelete
   */
  public async doDelete(menuItem: MenuItem) {
  }

  /**
   * doAdd
   */
  public async doAdd(menuItem: MenuItem) {
    await this.utl.doInLoading(`Adding menu item`, async () => {
      await this.utl.snooze();
      let done = false;
      if (this.data.cart) {
        done = await this.orderSvc.addItem(this.data.cart.id, menuItem);
      }
      this.utl.presentToast(done ? 'Added menu item' : 'Failed to add menu item');
    });
  }

}
