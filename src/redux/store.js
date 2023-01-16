import {configureStore, combineReducers } from "@reduxjs/toolkit"
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
})

export default store;