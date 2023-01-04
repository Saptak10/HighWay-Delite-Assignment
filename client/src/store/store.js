import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/products/productSlice'
import userReducer from '../reducers/user/userSlice'
import cartReducer from '../reducers/cart/cartSlice'
import orderReducer from '../reducers/order/orderSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
})