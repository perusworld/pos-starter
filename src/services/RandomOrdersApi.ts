import { SessionContext, SessionContextImpl } from "./SessionContext";
import { DateTime } from "luxon";
export class RandomOrdersApiImpl {
  private prefix = 100;
  private dummyData = {
    orders: [] as any[]
  }

  constructor(private ctx: SessionContextImpl) { }

  /**
   * init
   */
  public init() {

  }

  public status(arr: any[]) {
    return arr[Math.floor((Math.random() * arr.length) + 1) - 1];
  }

  public genPastOrder(idx: number): any {
    return {
      status: this.status(["Fulfilled", "Fulfilled", "Cancelled", "Fulfilled", "Fulfilled"]),
      date: DateTime.now().minus({ days: Math.floor((Math.random() * 30) + 1) }).toFormat('MM/DD/YYYY')
    }
  }
  public genCurrentOrder(idx: number): any {
    return {
      status: this.status(["Fulfilled", "In Progress", "Cancelled", "Fulfilled", "Fulfilled"]),
      date: DateTime.now().toFormat('MM/DD/YYYY')
    }
  }
  public genOrders(past: number, today: number) {
    if (0 === this.dummyData.orders.length) {
      for (var idx = 0; idx < past; idx++) {
        this.dummyData.orders.push(this.genPastOrder(idx));
      }
      for (var idy = 0; idy < today; idy++) {
        this.dummyData.orders.push(this.genCurrentOrder(idy));
      }
    }
    this.dummyData.orders.sort(function (a, b) {
      return (DateTime.fromFormat(a.date, "MM/DD/YYYY").valueOf() - DateTime.fromFormat(b.date, "MM/DD/YYYY").valueOf());
    });
    this.dummyData.orders.forEach((entry, idx) => {
      entry.id = this.prefix + idx;
      entry.name = "Order " + (this.prefix + idx);
    });
    this.dummyData.orders.sort(function (a, b) {
      return -1 * (DateTime.fromFormat(a.date, "MM/DD/YYYY").valueOf() - DateTime.fromFormat(b.date, "MM/DD/YYYY").valueOf());
    });
    // this.orderCart.counter = this.prefix + past + today - 1;
    // this.orderCart.clear();
    return this.dummyData;
  }
  public confirmOrder(req: any) {
    this.dummyData.orders.unshift({
      id: parseInt(req.id),
      name: "Order " + req.id,
      status: "In Progress",
      date: DateTime.now().toFormat('MM/DD/YYYY')
    })
    return {
      status: true
    };
  }


}

export const RandomOrdersApi = new RandomOrdersApiImpl(SessionContext);