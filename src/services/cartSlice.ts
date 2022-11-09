import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';

interface CartState {
  id: string;
  counter: number;
  entries: any[];
  count: number;
  total: number;
  tax: number;
  promos: any[];
  order: any;
  payment: {
    number: string;
    expMonth: string;
    expYear: string;
    cvc: string;
  },
  response: any
}

// Define the initial state using that type
const initialState: CartState = {
  id: "110",
  counter: 110,
  entries: [],
  count: 0,
  total: 0,
  tax: 9.5,
  promos: [],
  order: {},
  payment: {
    number: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  },
  response: {}
};

export const cartSlice = createSlice({
  name: 'cardAccount',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    initCart: (state) => {
    },
    addToCart: (state, action: PayloadAction<any>) => {
      const item = action.payload;
      var existing = state.entries.find(entry => entry.item.id === item.id);
      if (null == existing) {
        existing = {
          item: item,
          qty: 1
        }
        state.entries.push(existing);
      } else {
        existing.qty += 1;
      }
      state.count++;
      state.total += item.priceValue;
    },
    clearCart: state => {
      state.counter += 1;
      state.id = `${state.counter}`;
      state.entries = [];
      state.promos = [];
      state.count = 0;
      state.total = 0;
      state.order = {};
      state.payment = {
        number: "",
        expMonth: "",
        expYear: "",
        cvc: ""
      };
      state.response = {};
    },
  },
});

export const { initCart, addToCart, clearCart } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCartCost = (state: RootState) =>
  state.cart.total;
export const selectCartTax = (state: RootState) =>
  state.cart.tax;
export const selectCartCount = (state: RootState) =>
  state.cart.count;
export const selectCartEntries = (state: RootState) =>
  state.cart.entries;
export const selectCartId = (state: RootState) =>
  state.cart.id;

export default cartSlice.reducer;
