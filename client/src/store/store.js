import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice/index.js'
import adminProductsReducer from './admin/products-slice/index.js'
import shopProductSlice from './shop/products-slice/index.js'
import shopCartSlice from './shop/cart-slice/index.js'
import shopAddressSlice from './shop/address-slice/index.js'
import shopOrderSlice from './shop/order-slice/index.js'
import adminOrderSlice from './admin/order-slice/index.js'
import shopSearchSlice from './shop/search-slice/index.js'
import shopReviewSlice from './shop/review-slice/index.js'
import commonFeatureSlice from './common/index.js'

const store = configureStore({
    reducer:{
        auth:authReducer,
       adminProducts: adminProductsReducer,
       shopProducts: shopProductSlice,
       shopCart:shopCartSlice,
       shopAddress:shopAddressSlice,
       shopSearch:shopSearchSlice,
       shopOrder:shopOrderSlice,
       shopReview:shopReviewSlice,
       adminOrder:adminOrderSlice,
       commonFeatureSlice


    }
});

export default store;