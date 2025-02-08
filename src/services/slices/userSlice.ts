import { loginUserApi, TLoginData, getUserApi, registerUserApi, TRegisterData, updateUserApi, forgotPasswordApi } from '@api';
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
    isAuthenticated: boolean,
    user: TUser,
    password: string,
    loginUserError: string | undefined,
    registerUserError: string | undefined,
    updateUserError: string | null,
    forgotPasswordError: string | null,
    isLoading: boolean
}

const initialState: IUserListState = {
    isAuthenticated: false,
    user: {
        email: '',
        name: ''
    },
    password: '',
    loginUserError: undefined,
    registerUserError: undefined,
    updateUserError: null,
    forgotPasswordError: null,
    isLoading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
        })

        .addCase(fetchUser.pending, (state) => {
            state.loginUserError = undefined;
            state.isLoading = true;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.isAuthenticated = true
        })

        .addCase(loginUser.pending, (state) => {
            state.loginUserError = undefined;
            state.isLoading = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loginUserError = action.error.message;
            state.isLoading = false;
            state.isAuthenticated = false
            console.log('неудачный вход');
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.isAuthenticated = true
        })

        .addCase(registerUser.pending, (state) => {
            state.registerUserError = undefined;
            state.isLoading = true;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.registerUserError = action.error.message;
            state.isLoading = false;
            state.isAuthenticated = false
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.isAuthenticated = true
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