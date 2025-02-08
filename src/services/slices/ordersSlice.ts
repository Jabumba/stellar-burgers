import { getFeedsApi, orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const fetchOrders = createAsyncThunk(
    'orders/getAll',
    // async () => {
    //     const orders = await getFeedsApi();
    //     return orders;
    // }
    getFeedsApi
);

export const fetchUserOrders = createAsyncThunk(
    'orders/getUserOrders',
    // async () => {
    //     const orders = await getFeedsApi();
    //     return orders;
    // }
    getOrdersApi
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
    orders: TOrder[]
    userOrders: TOrder[]
    buildingOrder: {
        bun: TConstructorIngredient | null
        ingredients: TConstructorIngredient[]
    },
    // buildingOrder: TConstructorIngredient | null,
    yourOrder: {
        order: TOrder | null
        name: string | null
    }
    currentOrder: TOrder[] | null
    currentOrderId: number
    total: number | null
    totalToday: number | null
    isLoading: boolean
    isLoadingOrder: boolean
    isContain: boolean
}

const initialState: IOrdersListState = {
    orders: [],
    userOrders: [],
    buildingOrder: {
        bun: null,
        ingredients: []
    },
    yourOrder: {
        order: null,
        name: null,
    },
    currentOrder: null,
    currentOrderId: 0,
    total: null,
    totalToday: null,
    isLoading: false,
    isLoadingOrder: false,
    isContain: false
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setCurrentOrderId: (state, action: PayloadAction<number>) => {
            state.currentOrderId = action.payload
        },
        // setBunId: (state, action: PayloadAction<string>) => {
        //     state.buildingOrder.bun._id = action.payload
        // },
        // addIngredient: (state, action: PayloadAction<TIngredient>) => {
        //     state.buildingOrder.ingredients.push(action.payload)
        // }
        // addIngredient: (state, action: PayloadAction<TIngredient>) => {
        //     action.payload.type === 'bun' 
        //     ? state.buildingOrder.bun = action.payload 
        //     : state.buildingOrder.ingredients.push(action.payload as TConstructorIngredient)
        // },
        addIngredient: {
            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
                action.payload.type === 'bun' 
                ? state.buildingOrder.bun = action.payload 
                : state.buildingOrder.ingredients.push(action.payload)
            },
            prepare: (ingredient: TIngredient) => {
                const id = nanoid();
                return { payload: {...ingredient, id } };
            }
        },
        deleteIngredient: (state, action: PayloadAction<string>) => {
            const ingredients = state.buildingOrder.ingredients;
            const changeIngredients = ingredients.filter((ingredient) => {
                return ingredient.id !== action.payload
            })
            state.buildingOrder.ingredients = changeIngredients;
        },
        changeIngredients: (state, action: PayloadAction<{changedIndex: number, needIndex: number}>) => {
            const repositionIngredients = state.buildingOrder.ingredients;
            
            const disabledIngredient = repositionIngredients[action.payload.needIndex];
            repositionIngredients[action.payload.needIndex] = repositionIngredients[action.payload.changedIndex];
            repositionIngredients[action.payload.changedIndex] = disabledIngredient;

            state.buildingOrder.ingredients = repositionIngredients;
        }
    },
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

        .addCase(fetchUserOrders.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userOrders = action.payload;
            state.isContain = true;
        })
        .addCase(fetchUserOrders.rejected, (state) => {
            state.isLoading = false;
            state.isContain = false;
        })

        .addCase(fetchPostOrder.pending, (state) => {
            state.isLoadingOrder = true;
        })
        .addCase(fetchPostOrder.fulfilled, (state, action) => {
            state.isLoadingOrder = false;
            // state.yourOrder.order = action.payload.order;
            // state.yourOrder.name = action.payload.name
            state.yourOrder = action.payload
            state.isContain = true;
        })
        .addCase(fetchPostOrder.rejected, (state) => {
            state.isLoadingOrder = false;
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
        getAllOrders: (state) => state.orders,
        getUserOrders: (state) => state.userOrders,
        getBuildingOrder: (state) => state.buildingOrder,
        getYourOrder: (state) => state.yourOrder,
        getTotal: (state) => state.total,
        getTotalToday: (state) => state.totalToday,
        getCurrentOrder: (state) => state.currentOrder,
        getCurrentOrderId: (state) => state.currentOrderId,
        getContainStatus: (state) => state.isContain,
        getLoadingStatus: (state) => state.isLoading,
        getLoadingOrderStatus: (state) => state.isLoadingOrder
    }
});

export const { setCurrentOrderId, addIngredient, deleteIngredient, changeIngredients } = ordersSlice.actions
export const { getAllOrders, getUserOrders, getBuildingOrder, getYourOrder, getTotal, getTotalToday, getCurrentOrder, getCurrentOrderId, getContainStatus, getLoadingStatus, getLoadingOrderStatus } = ordersSlice.selectors;
export { ordersSlice };