import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItem: localStorage.getItem("cartItem") ?
        JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalAmount: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
    reducers: {
        ADD_TO_CART(state, action) {
            // console.log(action.payload);   
        },
        
        CLEAR_CART(state, action) {
            state.cartItem = []
            state.cartTotalAmount = 0
        }
  }
});

export const {ADD_TO_CART, CLEAR_CART} = cartSlice.actions
export const selectCartItem = (state) => state.cart.cartItem
export const setCartAmount = (state) => state.cart.cartTotalAmount
export default cartSlice.reducer