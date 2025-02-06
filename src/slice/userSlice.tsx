import { createSlice } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice";
import { LoginUserInterface } from "../types/user";

interface userInterface {
    isAuthenticated: boolean,
    token: string,
    userData: LoginUserInterface | null
}

const initialState: userInterface = {
    isAuthenticated: false,
    token: '',
    userData: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            apiSlice.endpoints.login.matchFulfilled,
            (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token
                state.userData = action.payload.data.user
            }
        )
    }
})

export const selectIsAuthenticated = (state: { user: userInterface }) => state.user.isAuthenticated


export default userSlice.reducer