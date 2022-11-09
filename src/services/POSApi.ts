import { RandomOrdersApi, RandomOrdersApiImpl } from "./RandomOrdersApi";
import { SessionContext, SessionContextImpl } from "./SessionContext";

export class POSApiImpl {
  constructor(private ctx: SessionContextImpl, private rndOrdApi: RandomOrdersApiImpl) { }

  public async getJson(file: string) {
    let ret = null;
    try {
      const resp = await fetch('/data/' + file);
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
  public async menu() {
    const data = await this.doPost('/menu', {});
    return data ? data : this.getJson("menu.json");
  }
  public async orders() {
    const data = await this.doPost('/orders', {});
    return data && data.orders ? data : this.rndOrdApi.genOrders(100, 10);
  }
  public async confirm(req: any) {
    const data = await this.doPost('/confirm', req);
    return data.status ? data : this.rndOrdApi.confirmOrder(req);
  }
}

export const POSApi = new POSApiImpl(SessionContext, RandomOrdersApi);