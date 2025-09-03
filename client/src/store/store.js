import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index.js'
import adminProductsReducer from './admin/products-slice/index.js'
import shopProductSlice from './shop/products-slice/index.js'
import shopCartSlice from './shop/cart-slice/index.js'

const store = configureStore({
    reducer:{
        auth:authReducer,
       adminProducts: adminProductsReducer,
       shopProducts: shopProductSlice,
       shopCart:shopCartSlice,
    }
});

export default store;