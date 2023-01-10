export interface Menu {
  menu: MenuItem[]
}

export interface MenuItem {
  id: string,
  name: string,
  price: string,
  priceValue: number,
  image: string,
}

export enum OrderStatus {
  New = "New", Fulfilled = "Fulfilled", InProgress = "InProgress", Cancelled = "Cancelled"
}

export interface Order {
  id: number,
  name: string,
  status: OrderStatus,
  date: string,
}

export interface OrderItem {
  item: MenuItem,
  qty: number
}

export interface Payment {
  holderName: string,
  pan: string,
  expMonth: string,
  expYear: string,
  cvc: string,
}

export interface Cart extends Order {
  items: OrderItem[],
  count: number;
  food: number;
  total: number;
  tax: number;
  payment: Payment;
}
