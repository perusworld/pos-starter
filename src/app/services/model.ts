export const APP_CONFIG = "-app-config-";
export const NEW_ORDER = 'new-order';

export interface AppConfig {
  app?: App;
}

export interface App {
  name: string,
  title: string,
  description: string,
  menu: string,
  admin: boolean,
  orderConfirm: string,
  cardInput: boolean,
  cardTap: boolean,
  scanPay: boolean,

}

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
  itemCost: number;
  total: number;
  tax: number;
  payment: Payment;
}

export enum TapPurpose {
  PAN = "PAN"
}

