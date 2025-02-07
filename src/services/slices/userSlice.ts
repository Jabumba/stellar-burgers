import { loginUserApi, TLoginData } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }: TLoginData) => {
        const data = await loginUserApi({ email, password });
        return data;
    }
);

interface IUserListState {
    isAuthChecked: boolean, // флаг для статуса проверки токена пользователя
    isAuthenticated: boolean,
    user: TUser,
    password: string | null,
    loginUserError: unknown,
    loginUserRequest: boolean,
    isLoading: boolean
}

const initialState: IUserListState = {
    isAuthChecked: false, // флаг для статуса проверки токена пользователя
    isAuthenticated: false,
    user: {
        email: '',
        name: ''
    },
    password: null,
    loginUserError: null,
    loginUserRequest: false,
    isLoading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.loginUserRequest = true;
            state.loginUserError = null;
            state.isLoading = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loginUserRequest = false;
            state.loginUserError = action.payload;
            state.isAuthChecked = true;
            state.isLoading = false;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.loginUserRequest = false;
            state.isAuthenticated = true;
            state.isAuthChecked = true;
            state.isLoading = false;
        })
    },
    selectors: {
        getAuthenticationStatus: (state) => state.isAuthenticated,
        getUser: (state) => state.user,
        getPassword: (state) => state.password,
        getLoadingStatus: (state) => state.isLoading
    }
});

export const { getAuthenticationStatus, getUser, getPassword, getLoadingStatus } = userSlice.selectors;
export { userSlice };