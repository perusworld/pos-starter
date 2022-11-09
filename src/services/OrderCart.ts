import { SessionContext, SessionContextImpl } from "./SessionContext";

export class OrderCartImpl {
  public id = "110";
  public counter = 110;
  public entries = [] as any[];
  public count = 0;
  public total = 0;
  public tax = 9.5;
  public promos = [];
  public order = {};
  public payment = {
    number: "",
    expMonth: "",
    expYear: "",
    cvc: ""
  };
  public response = {
  } as any;

  constructor(private ctx: SessionContextImpl) { }

  public init() {
  }
  public add(item: any) {
    var existing = this.entries.find(function (entry) {
      return entry.item.id === item.id;
    });
    if (null == existing) {
      existing = {
        item: item,
        qty: 1
      }
      this.entries.push(existing);
    } else {
      existing.qty += 1;
    }
    this.count++;
    this.total += item.priceValue;
  }
  public clear() {
    this.counter += 1;
    this.id = "" + this.counter;
    this.entries = [];
    this.promos = [];
    this.count = 0;
    this.total = 0;
    this.order = {};
    this.payment = {
      number: "",
      expMonth: "",
      expYear: "",
      cvc: ""
    };
    this.response = {
    };
  }
}

export const OrderCart = new OrderCartImpl(SessionContext);