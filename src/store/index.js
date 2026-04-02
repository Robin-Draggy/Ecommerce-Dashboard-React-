import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/ProductSlice"
import orderReducer from './features/orders/OrderSlice'
import customerReducer from './features/customers/CustomerSlice'
import categoryReducer from './features/categories/CategoriesSlice'
import inventoryReducer from './features/inventories/InventoriesSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        order: orderReducer,
        customer: customerReducer,
        category: categoryReducer,
        inventory: inventoryReducer
    }
});