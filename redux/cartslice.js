import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    additem(state, action) {
      state.items.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.quantity;
      state.totalQuantity += 1;
    },
    reset(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalQuantity = 0;
    },
  },
});
export const { additem, reset } = cartSlice.actions;
export default cartSlice.reducer;
