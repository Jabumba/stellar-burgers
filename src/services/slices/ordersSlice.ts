import { getFeedsApi, orderBurgerApi, getOrderByNumberApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const fetchOrders = createAsyncThunk(
    'orders/getAll',
    // async () => {
    //     const orders = await getFeedsApi();
    //     return orders;
    // }
    getFeedsApi
);

export const fetchPostOrder = createAsyncThunk(
    'orders/post',
    async (data: string[]) => {
        const order = await orderBurgerApi(data);
        return order;
    }
);

export const fetchOrderById = createAsyncThunk(
    'orders/getById',
    async (id: number) => {
        const order = await getOrderByNumberApi(id);
        return order;
    }
);

interface IOrdersListState {
    orders: TOrder[];
    order: TOrder | null;
    currentOrder: TOrder[] | null;
    name: string | null;
    total: number | null;
    totalToday: number | null;
    isLoading: boolean;
    isContain: boolean;
}

const initialState: IOrdersListState = {
    orders: [],
    order: null,
    currentOrder: null,
    name: null,
    total: null,
    totalToday: null,
    isLoading: false,
    isContain: false
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrders.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
            state.isContain = true;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            console.log('ошибка');
            state.isContain = false;
        })

        .addCase(fetchPostOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchPostOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.order = action.payload.order;
            state.name = action.payload.name
            state.isContain = true;
        })
        .addCase(fetchPostOrder.rejected, (state, action) => {
            state.isLoading = false;
            console.log('ошибка');
            state.isContain = false;
        })

        .addCase(fetchOrderById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchOrderById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentOrder = action.payload.orders;
            state.isContain = true;
        })
        .addCase(fetchOrderById.rejected, (state, action) => {
            state.isLoading = false;
            console.log('ошибка');
            state.isContain = false;
        })
    },
    selectors: {
        getOrders: (state) => state.orders,
        getTotal: (state) => state.total,
        getTotalToday: (state) => state.totalToday,
        getOrder: (state) => state.order,
        getCurrentOrder: (state) => state.currentOrder,
        getName: (state) => state.name,
        getContainStatus: (state) => state.isContain,
        getLoadingStatus: (state) => state.isLoading
    }
});

export const { getOrders, getTotal, getCurrentOrder, getTotalToday, getOrder, getName, getContainStatus, getLoadingStatus } = ordersSlice.selectors;
export { ordersSlice };