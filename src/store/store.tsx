import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"
import userReducer from '../slice/userSlice'


const stringMiddleware = () => (next) => (action) => {
    if(typeof action === 'string') {
        return({
            type: action
        })
    }
    return next(action)
}

export const store = configureStore({
    reducer: { [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer
     },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;