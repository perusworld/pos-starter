import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart, Menu, MenuItem, Order, Payment } from './model';
import { RandomOrdersApiService } from './random-orders-api.service';

@Injectable({
  providedIn: 'root'
})
export class PosApiService {

  constructor(private rndOrdApi: RandomOrdersApiService) { }

  public async getJson(file: string) {
    let ret = null;
    try {
      const resp = await fetch(`${file}`);
      ret = resp.json();
    } catch (error) {
      console.log(error);
    }
    return ret;
  }
  public async doPost(url: string, req: any) {
    let ret = undefined;
    try {
      const resp = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      });
      ret = await resp.json();
    } catch (error) {
      console.log(error);
    }
    return ret;
  }
  public async menu(): Promise<Menu> {
    const data = await this.doPost('/menu', {});
    return data ? data : this.getJson(`./assets/data/${environment.menu}.json`);
  }
  public async orders(): Promise<Order[]> {
    const data = await this.doPost('/orders', {});
    return data?.orders ? data : this.rndOrdApi.genOrders(100, 10);
  }
  public async newOrder(): Promise<Cart> {
    const data = await this.doPost('/new-order', {});
    return data?.status ? data : this.rndOrdApi.newOrder();
  }
  public async currentOrder(): Promise<Cart> {
    const data = await this.doPost('/current-order', {});
    return data?.status ? data : this.rndOrdApi.getCurrentOrder();
  }
  public async addItem(id: number, item: MenuItem): Promise<boolean> {
    const data = await this.doPost(`/add-item/${id}`, {});
    return data?.status ? data : this.rndOrdApi.addItem(id, item);
  }
  public async setPayment(id: number, item: Payment): Promise<boolean> {
    const data = await this.doPost(`/set-payment/${id}`, {});
    return data?.status ? data : this.rndOrdApi.setPayment(id, item);
  }
  public async getCart(id: number): Promise<Cart> {
    const data = await this.doPost('/get-cart', { id });
    return data?.status ? data : this.rndOrdApi.getCart(id);
  }
  public async confirm(id: number) {
    const data = await this.doPost('/confirm-order', {});
    return data?.status ? data : this.rndOrdApi.confirmOrder(id);
  }
}
