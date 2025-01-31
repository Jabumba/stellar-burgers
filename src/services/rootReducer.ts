// import ingredientsSliceReducer from './slices/ingredientsSlice'
// import userSliceReducer from './slices/userSlice'
// import ordersSliceReducer from './slices/ordersSlice'
import ingredientsSliceReducer from './slices/ingredientsSlice';
import userSliceReducer from './slices/userSlice';
import ordersSliceReducer from './slices/ordersSlice';
import { combineReducers } from "@reduxjs/toolkit"

export const rootReducer = combineReducers({
    ingredientsSlice: ingredientsSliceReducer,
    // userSlice: userSliceReducer,
    // ordersSlice: ordersSliceReducer
}); 