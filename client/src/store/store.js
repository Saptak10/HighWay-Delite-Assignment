import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reducers/products/productSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
})