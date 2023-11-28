
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { IUserState } from "../../@types/user";

const initialState: IUserState = {
    isLoading: false,
    user: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        logoutSuccess: (state) => {
            state.isLoading = false;
            state.user = null;
        }
    }
})

export function login(username: string, password: string) {
    const loginObject = {
        username: username,
        password: password
    }

    return async (dispatch: Dispatch) => {
        dispatch(authSlice.actions.startLoading());
        try {
            const response = await fetch(`http://localhost:5214/api/users/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginObject),
            });
        
            if (!response.ok) {
                throw new Error('Login error');
            }
            const responseData = await response.json();
            dispatch(authSlice.actions.loginSuccess(responseData))
            return true;
        } catch (error) {
            console.log(error);
            dispatch(authSlice.actions.hasError(error))
            return false;
        }
    }
}

export function logout() {
    return async (dispatch: Dispatch) => {
        dispatch(authSlice.actions.logoutSuccess())
    }
}

export default authSlice.reducer;
