/**
 * @jest-environment jsdom
 */

import {expect, describe, it} from '@jest/globals';

import { initialState, logoutUser, updateUser, fetchUser, loginUser, registerUser, userSlice, IUserListState } from './userSlice';
import { TUserResponse, TRegisterData, TLoginData, TAuthResponse } from '@api';

describe('synchronous actions from userSlice', () => {
    const loadingStateUser: IUserListState = {
        ...initialState,
        isLoading: true
    }
    const trialUserData: TRegisterData = {
        email: 'trialmail@gmail.com',
        name: 'Alex',
        password: 'defdeert'
    }
    describe('logoutUser', () => {
        it('status pending', () => {
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                logoutUser.pending('')
            )
            expect(actualState).toEqual(loadingStateUser);
        })
        it('status fulfilled', () => {
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                logoutUser.fulfilled({success: true}, '')
            )
            expect(actualState).toEqual(initialState)
        })
    })

    describe('updateUser', () => {
        it('status pending', () => {
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                updateUser.pending('', trialUserData)
            )
            expect(actualState).toEqual(loadingStateUser);
        })
        it('status fulfilled', () => {
            const expectedState: IUserListState = {
                isAuthenticated: true,
                user: {
                    email: trialUserData.email,
                    name: trialUserData.name
                },
                password: '',
                loginUserError: undefined,
                registerUserError: undefined,
                updateUserError: null,
                forgotPasswordError: null,
                isLoading: false
            }
            const trialResponse: TUserResponse = {
                success: true,
                user: {
                    email: trialUserData.email,
                    name: trialUserData.name
                }
            }
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                updateUser.fulfilled(trialResponse, '', trialUserData)
            )
            expect(actualState).toEqual(expectedState);
        })
    })

    describe('fetchUser', () => {
        it('status pending', () => {
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                fetchUser.pending('')
            )
            expect(actualState).toEqual(loadingStateUser);
        })
        it('status fulfilled', () => {
            const expectedState: IUserListState = {
                isAuthenticated: true,
                user: {
                    email: trialUserData.email,
                    name: trialUserData.name
                },
                password: '',
                loginUserError: undefined,
                registerUserError: undefined,
                updateUserError: null,
                forgotPasswordError: null,
                isLoading: false
            }
            const trialResponse: TUserResponse = {
                success: true,
                user: {
                    email: trialUserData.email,
                    name: trialUserData.name
                }
            }
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                fetchUser.fulfilled(trialResponse, '')
            )
            expect(actualState).toEqual(expectedState);
        })
    })

    describe('loginUser', () => {
        const trialLoginData: TLoginData = {
            email: trialUserData.email,
            password: trialUserData.password
        }
        it('status pending', () => {
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                loginUser.pending('', trialLoginData)
            )
            expect(actualState).toEqual(loadingStateUser);
        })
        it('status fulfilled', () => {
            const expectedState: IUserListState = {
                isAuthenticated: true,
                user: {
                    email: trialUserData.email,
                    name: trialUserData.name
                },
                password: '',
                loginUserError: undefined,
                registerUserError: undefined,
                updateUserError: null,
                forgotPasswordError: null,
                isLoading: false
            }
            const trialResponse: TAuthResponse = {
                success: true,
                refreshToken: '4321',
                accessToken: '1234',
                user: {
                    email: trialUserData.email,
                    name: trialUserData.name
                }
            }
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                loginUser.fulfilled(trialResponse, '', trialLoginData)
            )
            expect(actualState).toEqual(expectedState);
        })
    })

    describe('registerUser', () => {
        it('status pending', () => {
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                registerUser.pending('', trialUserData)
            )
            expect(actualState).toEqual(loadingStateUser);
        })
        it('status fulfilled', () => {
            const expectedState: IUserListState = {
                isAuthenticated: true,
                user: {
                    email: trialUserData.email,
                    name: trialUserData.name
                },
                password: '',
                loginUserError: undefined,
                registerUserError: undefined,
                updateUserError: null,
                forgotPasswordError: null,
                isLoading: false
            }
            const trialResponse: TAuthResponse = {
                success: true,
                refreshToken: '4321',
                accessToken: '1234',
                user: {
                    email: trialUserData.email,
                    name: trialUserData.name
                }
            }
            const actualState = userSlice.reducer(
                {
                    ...initialState
                },
                registerUser.fulfilled(trialResponse, '', trialUserData)
            )
            expect(actualState).toEqual(expectedState);
        })
    })
})