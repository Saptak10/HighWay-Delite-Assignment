import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/products/productSlice'
import userReducer from '../reducers/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
})