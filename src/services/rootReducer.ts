import { ordersSlice } from './slices/ordersSlice';
// import { userSlice } from './slices/userSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice';

export const rootReducer = combineSlices(ingredientsSlice, ordersSlice, userSlice);
