import { Injectable } from '@angular/core';
import { Menu, MenuItem, Order, Payment } from './model';
import { OrderApiService } from './order-api.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private posApi: OrderApiService, private ctx: StorageService) { }

  public groupSize() {
    return 3;
  };
  public group<T>(array: T[] | undefined, blocks: number = this.groupSize(), fillBlanks = false) {
    var ret = [];
    var block = [] as T[];
    if (undefined !== array) {
      for (const entry of array) {
        if (block.length === blocks) {
          ret.push(block);
          block = []
        }
        block.push(entry);
      }
    }
    if (0 < block.length) {
      if (fillBlanks) {
        for (var idx = block.length; idx < blocks; idx++) {
          block.push({} as T);
        }
      }
      ret.push(block);
    }
    return ret;
  }
  public async menu(cached: boolean = false) {
    let ret: Menu | undefined;
    if (cached) {
      ret = await this.ctx.getCached('menu', async () => this.posApi.menu());
    } else {
      ret = await this.posApi.menu();
    }
    return ret;
  }
  public async orders(cached: boolean = false) {
    let ret: Order[] | undefined;
    if (cached) {
      ret = await this.ctx.getCached('orders', async () => this.posApi.orders());
    } else {
      ret = await this.posApi.orders();
    }
    return ret;
  }
  public async newOrder() {
    return this.posApi.newOrder();
  }
  public async currentOrder() {
    return this.posApi.currentOrder();
  }
  public async addItem(id: number, item: MenuItem) {
    return this.posApi.addItem(id, item);
  }
  public async getCart(id: number) {
    return this.posApi.getCart(id);
  }
  public async setPayment(id: number, payment: Payment) {
    return this.posApi.setPayment(id, payment);
  }
  public async confirm(id: number) {
    return this.posApi.confirm(id);
  }
  public tax(req: any, callback: any) {
    var ret = {} as any;
    ret.food = req.total
    ret.tax = req.total * req.tax / 100;
    ret.total = ret.food + ret.tax;
    callback(ret);
  }
  public payment(req: any, callback: any) {
    setTimeout(function () {
      callback({
        id: req.id,
        amount: req.order.total,
        desc: 'Thank you for your purchase, your order is being prepared. Your order number is ' + req.id,
        status: true
      });
    }, 1000);
  }

}
