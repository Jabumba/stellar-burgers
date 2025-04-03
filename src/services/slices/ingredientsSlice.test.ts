/**
 * @jest-environment jsdom
 */

import {expect, describe, it} from '@jest/globals';

import { initialState, fetchIngredients, ingredientsSlice, IngredientsListState } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('synchronous actions from ingredientsSlice', () => {
    const loadingStateIngredients: IngredientsListState = {
            ...initialState,
            isLoading: true
        }
    const trialIngredients: TIngredient[] = [
        {
            _id: 'd43fr23r32d22',
            name: 'average bun',
            type: 'bun',
            proteins: 13,
            fat: 8,
            carbohydrates: 78,
            calories: 289,
            price: 200,
            image: 'imageOne',
            image_large: 'imageLargeOne',
            image_mobile: 'imageMobileOne'
        },
        {
            _id: '43r43fferrfw',
            name: 'average re',
            type: 're',
            proteins: 2,
            fat: 3,
            carbohydrates: 12,
            calories: 85,
            price: 100,
            image: 'imageThree',
            image_large: 'imageLargeThree',
            image_mobile: 'imageMobileThree'
        },
        {
            _id: '4r345gg332',
            name: 'average main',
            type: 'main',
            proteins: 17,
            fat: 27,
            carbohydrates: 0,
            calories: 389,
            price: 600,
            image: 'imageTwo',
            image_large: 'imageLargeTwo',
            image_mobile: 'imageMobileTwo'
        }
    ]
    describe('fetchIngredients', () => {
        it('status pending', () => {
            const actualState = ingredientsSlice.reducer(
                {
                    ...initialState
                },
                fetchIngredients.pending('')
            )
            expect(actualState).toEqual(loadingStateIngredients);
        })
        it('status fulfilled', () => {
            const expectedState: IngredientsListState = {
                ingredients: trialIngredients,
                isLoading: false,
                isContain: true
            }
            const actualState = ingredientsSlice.reducer(
                {
                    ...initialState
                },
                fetchIngredients.fulfilled(trialIngredients, '')
            )
            expect(actualState).toEqual(expectedState);
        })
    })
})