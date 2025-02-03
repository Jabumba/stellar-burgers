// import { getOrdersApi } from '@api';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { TOrder } from '@utils-types';

// export const fetchOrders = createAsyncThunk(
//     'user/getOrders',
//     async () => {
//         const ingredients = await getOrdersApi();
//         return ingredients;
//     }
// );

// interface IOrdersListState {
//     orders: TOrder[];
//     total: number | null;
//     totalToday: number | null;
//     isLoading: boolean;
//     isContain: boolean;
// }

// const initialState: IOrdersListState = {
//     orders: [],
//     total: null,
//     totalToday: null,
//     isLoading: false,
//     isContain: false
// };

// const userSlice = createSlice({
//     name: 'orders',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchOrders.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(fetchOrders.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.orders = action.payload.orders;
//             state.total = action.payload.total;
//             state.totalToday = action.payload.totalToday;
//             state.isContain = true;
//         })
//         .addCase(fetchOrders.rejected, (state, action) => {
//             state.isLoading = false;
//             console.log('ошибка');
//             console.log(action)
//             state.isContain = false;
//         })
//     },
//     selectors: {
//         getOrders: (state) => state.orders,
//         getTotal: (state) => state.total,
//         getTotalToday: (state) => state.totalToday,
//         getContainStatus: (state) => state.isContain,
//         getLoadingStatus: (state) => state.isLoading
//     }
// });

// export const { getOrders, getTotal, getTotalToday, getContainStatus, getLoadingStatus } = userSlice.selectors;
// export { userSlice };