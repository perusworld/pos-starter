import { POSApi, POSApiImpl } from "./POSApi";
import { SessionContext, SessionContextImpl } from "./SessionContext";

export class POSServiceImpl {
  constructor(private ctx: SessionContextImpl, private posApi: POSApiImpl) { }
  public groupSize() {
    return 3;
  };
  public group(array: any[], blocks: number = this.groupSize(), fillBlanks = false) {
    var ret = [];
    var block = [] as any[];
    for (const entry of array) {
      if (block.length === blocks) {
        ret.push(block);
        block = []
      }
      block.push(entry);
    }
    if (0 < block.length) {
      if (fillBlanks) {
        for (var idx = block.length; idx < blocks; idx++) {
          block.push([]);
        }
      }
      ret.push(block);
    }
    return ret;
  }
  public async menu(cached: boolean) {
    let ret = undefined;
    if (cached) {
      ret = this.ctx.getCached('menu', async () => this.posApi.menu());
    } else {
      ret = this.posApi.menu();
    }
    return ret;
  }
  public orders(cached: boolean) {
    let ret = undefined;
    if (cached) {
      ret = this.ctx.getCached('orders', async () => this.posApi.orders());
    } else {
      ret = this.posApi.orders();
    }
    return ret;
  }
  public async confirm(req: any) {
    return this.posApi.confirm(req);
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

export const POSService = new POSServiceImpl(SessionContext, POSApi);