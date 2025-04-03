/**
 * @jest-environment jsdom
 */

import {expect, describe, it} from '@jest/globals';

import { IOrdersListState, initialState, ordersSlice, fetchOrders, fetchUserOrders, fetchPostOrder, fetchOrderById } from './ordersSlice';
import { TFeedsResponse, TNewOrderResponse, TOrderResponse } from '@api';
import { TOrder } from '@utils-types';
// import { TLoginData, TRegisterData } from '@api';
// import { TAuthResponse, TUserResponse } from '../../utils/burger-api'

describe('synchronous actions from ordersSlice', () => {
    const loadingStateFetchingOrders: IOrdersListState = {
        ...initialState,
        isLoading: true
    }
    const loadingStatePostingOrder: IOrdersListState = {
        ...initialState,
        isLoadingOrder: true
    }
    const trialOrders: TOrder[] = [
        {
            _id: 'gg43ggchj2b4hv2v',
            status: 'done',
            name: 'stellar order',
            createdAt: '19 march 2025',
            updatedAt: '20 march  2025',
            number: 123456789,
            ingredients: ['4jh234ghvhbjnk3', 'v2g34gh324v32v32jh4h3j2', '34jh23h4bh32']
        },
        {
            _id: '32d34ff324ggddw',
            status: 'done',
            name: 'stellar',
            createdAt: '30 march 2025',
            updatedAt: '31 march  2025',
            number: 123456789,
            ingredients: ['64334rewf1a', '434r3fqrfregtgfrefwssffg', '434r43f3fgw']
        }
    ]
    describe('fetchOrders', () => {
        const trialOrdersInf: TFeedsResponse = {
            success: true,
            orders: trialOrders,
            total: 32343453,
            totalToday: 20
        }
        it('status pending', () => {
            const actualState = ordersSlice.reducer(
                {
                    ...initialState
                },
                fetchOrders.pending('')
            )
            expect(actualState).toEqual(loadingStateFetchingOrders);
        })
        it('status fulfilled', () => {
            const expectedState: IOrdersListState = {
                orders: trialOrders,
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
                total: trialOrdersInf.total,
                totalToday: trialOrdersInf.totalToday,
                isLoading: false,
                isLoadingOrder: false,
                isContain: true
            }
            const actualState = ordersSlice.reducer(
                {
                    ...initialState
                },
                fetchOrders.fulfilled(trialOrdersInf, '')
            )
            expect(actualState).toEqual(expectedState)
        })
    })

    describe('fetchUserOrders', () => {
        it('status pending', () => {
            const actualState = ordersSlice.reducer(
                {
                    ...initialState
                },
                fetchUserOrders.pending('')
            )
            expect(actualState).toEqual(loadingStateFetchingOrders)
        })
        it('status fulfilled', () => {
            const expectedState: IOrdersListState = {
                orders: [],
                userOrders: trialOrders,
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
                isContain: true
            }
            const actualState = ordersSlice.reducer(
                {
                    ...initialState
                },
                fetchUserOrders.fulfilled(trialOrders, '')
            )
            expect(actualState).toEqual(expectedState);
        })
    })

    describe('fetchPostOrder', () => {
        const trialIngredients: string[] = ['fddscdcdscd', 'fsdcfdscsdcsd', 'wef2e23d2xccewd2'];
        const trialUserOrder: TNewOrderResponse = {
            success: true,
            order: {
                _id: 'gg43ggchj2b4hv2v',
                status: 'done',
                name: 'stellar order',
                createdAt: '19 march 2025',
                updatedAt: '20 march  2025',
                number: 233213421,
                ingredients: trialIngredients
            },
            name: 'trial user order'
        }
        it('status pending', () => {
            const actualState = ordersSlice.reducer(
                {
                    ...initialState
                },
                fetchPostOrder.pending('', trialIngredients)
            )
            expect(actualState).toEqual(loadingStatePostingOrder);
        })
        it('status fulfilled', () => {
            const expectedState: IOrdersListState = {
                orders: [],
                userOrders: [],
                buildingOrder: {
                    bun: null,
                    ingredients: []
                },
                yourOrder: {
                    order: trialUserOrder.order,
                    name: trialUserOrder.name,
                },
                currentOrder: null,
                currentOrderId: 0,
                total: null,
                totalToday: null,
                isLoading: false,
                isLoadingOrder: false,
                isContain: true
            }
            const actualState = ordersSlice.reducer(
                {
                    ...initialState
                },
                fetchPostOrder.fulfilled(trialUserOrder, '', trialIngredients)
            )
            expect(actualState).toEqual(expectedState);
        })
    })

    describe('fetchOrderById', () => {
        it('status pending', () => {
            const actualState = ordersSlice.reducer(
                {
                    ...initialState
                },
                fetchOrderById.pending('', 123456789)
            )
            expect(actualState).toEqual(loadingStateFetchingOrders);
        })
        it('status fulfilled', () => {
            const expectedState: IOrdersListState = {
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
                currentOrder: trialOrders,
                currentOrderId: 0,
                total: null,
                totalToday: null,
                isLoading: false,
                isLoadingOrder: false,
                isContain: true
            }
            const responseData: TOrderResponse = {
                success: true,
                orders: trialOrders
            }
            const actualState = ordersSlice.reducer(
                {
                    ...initialState
                },
                fetchOrderById.fulfilled(responseData, '', 123456789)
            )
            expect(actualState).toEqual(expectedState);
        })
    })
})