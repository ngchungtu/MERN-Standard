import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../reducers/todo'
import productReducer from '../reducers/product'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        product: productReducer
    }
})