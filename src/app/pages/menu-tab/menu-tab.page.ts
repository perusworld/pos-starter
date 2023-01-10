import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/services/model';
import { OrderService } from 'src/app/services/order.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.page.html',
  styleUrls: ['./menu-tab.page.scss'],
})
export class MenuTabPage implements OnInit {
  public data = {
    menu: [] as MenuItem[][]
  }

  constructor(private orderSvc: OrderService, private utl: UtilService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.doFetch();
  }

  public async doFetch() {
    await this.utl.doInLoading(`Loading menu items`, async () => {
      const menu = await this.orderSvc.menu();
      this.data.menu = this.orderSvc.group(menu?.menu);
    });
  }
}
