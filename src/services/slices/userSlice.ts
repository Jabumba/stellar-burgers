import { loginUserApi, TLoginData, getUserApi, registerUserApi, TRegisterData, updateUserApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({ email, name, password }: TRegisterData) => {
        const data = await registerUserApi({ email, name, password });
        return data;
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }: TLoginData) => {
        const data = await loginUserApi({ email, password });
        return data;
    }
);

export const fetchUser = createAsyncThunk(
    'user/getUser',
    // async () => {
    //     const data = await getUserApi();
    //     return data;
    // }
    getUserApi
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (user: Partial<TRegisterData>) => {
        const data = await updateUserApi(user);
        return data;
    }
);

interface IUserListState {
    // isAuthChecked: boolean, // флаг для статуса проверки токена пользователя
    isAuthenticated: boolean,
    user: TUser,
    password: string,
    loginUserError: string | undefined,
    registerUserError: string | undefined,
    // updateUserError: string | null,
    isLoading: boolean
}

const initialState: IUserListState = {
    // isAuthChecked: false, // флаг для статуса проверки токена пользователя
    isAuthenticated: false,
    user: {
        email: '',
        name: ''
    },
    password: '',
    loginUserError: undefined,
    registerUserError: undefined,
    // updateUserError: null,
    isLoading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateUser.pending, (state) => {
            // state.loginUserRequest = true;
            // state.updateUserError = null;
            state.isLoading = true;
        })
        .addCase(updateUser.rejected, (state, action) => {
            // state.loginUserRequest = false;
            // state.updateUserError = action.payload.error;
            // state.isAuthChecked = true;
            state.isLoading = false;
            console.log('ошибка смены данных');
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            // state.isAuthChecked = true;
            state.isLoading = false;
            // state.isAuthenticated = true
            console.log('данные изменены');
        })

        .addCase(fetchUser.pending, (state) => {
            // state.loginUserRequest = true;
            state.loginUserError = undefined;
            state.isLoading = true;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            // state.loginUserRequest = false;
            // state.loginUserError = action.payload;
            // state.isAuthChecked = true;
            state.isLoading = false;
            state.isAuthenticated = false
            console.log('пройдите авторизацию');
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            // state.isAuthChecked = true;
            state.isLoading = false;
            state.isAuthenticated = true
            console.log('добро пожаловать!');
        })

        .addCase(loginUser.pending, (state) => {
            // state.loginUserRequest = true;
            state.loginUserError = undefined;
            state.isLoading = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            // state.loginUserRequest = false;
            state.loginUserError = action.error.message;
            // state.isAuthChecked = true;
            state.isLoading = false;
            state.isAuthenticated = false
            console.log('неудачный вход');
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            // state.loginUserRequest = false;
            // state.isAuthenticated = true;
            // state.isAuthChecked = true;
            state.isLoading = false;
            state.isAuthenticated = true
            console.log('успешный вход');
        })

        .addCase(registerUser.pending, (state) => {
            state.registerUserError = undefined;
            state.isLoading = true;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.registerUserError = action.error.message;
            state.isLoading = false;
            state.isAuthenticated = false
            console.log('неудачная регистрация');
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.isAuthenticated = true
            console.log('успешная регистрация');
        })
    },
    selectors: {
        getAuthenticationStatus: (state) => state.isAuthenticated,
        getUserData: (state) => state.user,
        getPassword: (state) => state.password,
        getLoadingStatus: (state) => state.isLoading,
        getLoginError: (state) => state.loginUserError,
        getRegisterError: (state) => state.registerUserError
    }
});

export const { getAuthenticationStatus, getUserData, getPassword, getLoadingStatus, getLoginError, getRegisterError } = userSlice.selectors;
export { userSlice };