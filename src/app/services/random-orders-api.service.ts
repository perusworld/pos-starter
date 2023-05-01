import { Injectable } from '@angular/core';
import { DateTime } from "luxon";
import { environment } from 'src/environments/environment';
import { Cart, MenuItem, Order, OrderItem, OrderStatus, Payment } from './model';
import { UtilService } from './util.service';

const DATE_FORMAT = 'MM/dd/yyyy';
@Injectable({
  providedIn: 'root'
})
export class RandomOrdersApiService {
  private prefix = 100;
  private dummyData = {
    orders: [] as Order[],
    currentCart: undefined as (Cart | undefined)
  }

  constructor(private utl: UtilService) { }

  /**
   * init
   */
  public init() {

  }

  public genPastOrder(idx: number) {
    return {
      status: this.utl.rndOf([OrderStatus.Fulfilled, OrderStatus.Fulfilled, OrderStatus.Cancelled,
      OrderStatus.Fulfilled, OrderStatus.Fulfilled]),
      date: DateTime.now().minus({ days: Math.floor((Math.random() * 30) + 1) }).toFormat(DATE_FORMAT)
    }
  }

  public genCurrentOrder(idx: number) {
    return {
      status: this.utl.rndOf([OrderStatus.Fulfilled, OrderStatus.InProgress, OrderStatus.Cancelled,
      OrderStatus.Fulfilled, OrderStatus.Fulfilled, OrderStatus.InProgress]),
      date: DateTime.now().toFormat(DATE_FORMAT)
    }
  }

  public genOrders(past: number, today: number): Order[] {
    let ret: Order[] = [];
    if (0 === this.dummyData.orders.length) {
      for (var idx = 0; idx < past; idx++) {
        ret.push(this.genPastOrder(idx) as Order);
      }
      for (var idy = 0; idy < today; idy++) {
        ret.push(this.genCurrentOrder(idy) as Order);
      }
      ret = ret.sort((a, b) =>
        (DateTime.fromFormat(a.date, DATE_FORMAT).valueOf() - DateTime.fromFormat(b.date, DATE_FORMAT).valueOf())
      );
      ret = ret.map((entry, idx) => {
        entry.id = this.prefix + idx;
        entry.name = "Order " + (this.prefix + idx);
        return entry;
      });
      ret = ret.sort((a, b) => -1 * (a.id - b.id));
      this.dummyData.orders = ret;
      this.newOrder();
    } else {
      ret = this.dummyData.orders;
    }
    return ret;
  }
  public newOrder(): Cart {
    const id = 0 < this.dummyData.orders.length ? this.dummyData.orders[0].id + 1 : 1;
    this.dummyData.currentCart = {
      id,
      name: `Order ${id}`,
      items: [] as OrderItem[],
      status: OrderStatus.New,
      date: DateTime.now().toFormat(DATE_FORMAT),
      itemCost: 0,
      total: 0,
      count: 0,
      tax: 0,
      payment: {}
    } as Cart;
    return this.dummyData.currentCart;
  }
  public getCurrentOrder(): Cart {
    return this.dummyData.currentCart ? this.dummyData.currentCart : this.newOrder();
  }
  public getCart(id: number): Cart | undefined {
    let ret;
    if (this.dummyData.currentCart?.id === id) {
      ret = this.dummyData.currentCart;
    }
    if (!ret) {
      ret = this.dummyData.orders.find(ord => id === ord.id) as Cart;
    }
    return ret ? ret : undefined;
  }
  public addItem(id: number, item: MenuItem): boolean {
    let ret = false;
    const cart = this.getCart(id);
    if (cart) {
      const items = cart.items;
      var existing = items.find(entry => entry.item.id === item.id);
      if (existing) {
        existing.qty += 1;
      } else {
        items.push({ item: item, qty: 1 });
      }
      cart.count++;
      cart.itemCost += item.priceValue;
      cart.tax = cart.itemCost * environment.tax / 100;
      cart.total = cart.itemCost + cart.tax;
      ret = true;
    }
    return ret;
  }
  public setPayment(id: number, payment: Payment): boolean {
    let ret = false;
    const cart = this.getCart(id);
    if (cart) {
      cart.payment = payment;
      ret = true;
    }
    return ret;
  }
  public confirmOrder(id: number): boolean {
    let ret = false;
    const cart = this.getCart(id);
    if (cart) {
      this.dummyData.orders.unshift({
        ...cart, ...{
          status: OrderStatus.InProgress,
          date: DateTime.now().toFormat(DATE_FORMAT)
        }
      });
      ret = true;
    }
    return ret;
  }

}
