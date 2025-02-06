import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { LoginResponseInterface, SignUpResponseInterface, UserInterface } from "../types/user"
import { GetAllGamesResponse, GetGameByIdResponse } from "../types/game"
import { RootState } from "../store/store";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://epicGamesServer/api/v1',
        credentials: 'include',
        prepareHeaders: (headers, { getState, endpoint }) => {
            const state = getState() as RootState;
            const token = state.user.token;

            if(token && (endpoint === 'getUserProfile')) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ['Auth', 'Games'],
    endpoints: builder => ({
        signUp: builder.mutation<SignUpResponseInterface, UserInterface>({
            query: newUser => ({
                url: '/users/signup',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Auth']
        }),
        login: builder.mutation<LoginResponseInterface, UserInterface>({
            query: existingUser => ({
                url: '/users/login',
                method:'POST',
                body: existingUser
            }),
            
            invalidatesTags: ['Auth']
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: '/users/me',
                method: 'GET'
            }),
            providesTags: ['Auth']
        }),
        getAllGames: builder.query<GetAllGamesResponse, void>({
            query: () => ({
                url: '/games',
                method: 'GET',
            }),
            providesTags: ['Games']
        }),
        getGameById: builder.query<GetGameByIdResponse, string>({
            query: (id) => ({
                url: `/games/${id}`,
                method: 'GET'
            }),
            providesTags: ['Games']
        }),
        getFreeGames: builder.query<GetAllGamesResponse, void>({
            query: () => ({
                url: '/games?price[lte]=0',
                method: 'GET'
            }),
            providesTags: ['Games']
        }),
        getDiscountGames: builder.query<GetAllGamesResponse, void>({
            query: () => ({
                url: '/games?discount[gt]=0&sort=price',
                method: 'GET'
            }),
            providesTags: ['Games']
        }),
        getHighRatedGames: builder.query<GetAllGamesResponse, void>({
            query: () => ({
                url: '/games?playerRating[gte]=4.5&sort=playerRating',
                method: 'GET'
            }),
            providesTags: ['Games']
        }),
        getNewGames: builder.query<GetAllGamesResponse, void>({
            query: () => ({
                url: '/games?releaseDate[gte]=2024-01-01T00:00:00.000Z&releaseDate[lt]=2025-01-01T00:00:00.000Z',
                method: 'GET'
            }),
            providesTags: ['Games']
        }),
        getTwoHighRatedGames: builder.query<GetAllGamesResponse, void>({
            query: () => ({
                url: '/games?playerRating[gte]=4.5&sort=playerRating&limit=2',
                method: 'GET'
            }),
            providesTags: ['Games']
        }),
        getThreeNewGames: builder.query<GetAllGamesResponse, void>({
            query: () => ({
                url: '/games?releaseDate[gte]=2024-01-01T00:00:00.000Z&releaseDate[lt]=2025-01-01T00:00:00.000Z&limit=3',
                method: 'GET'
            }),
            providesTags: ['Games']
        }),
        getSixHighRatedGames: builder.query<GetAllGamesResponse, void>({
            query: () => ({
                url: '/games?playerRating[gte]=4.5&sort=playerRating&limit=6',
                method: 'GET'
            }),
            providesTags: ['Games'],
            keepUnusedDataFor: 6000
        }),
        searchGames: builder.query<GetAllGamesResponse, string>({
            query: (searchQuery: string) => ({
                url: `/games?search=${searchQuery}`,
                method: 'GET'
            }),
            providesTags: ['Games']
        })
    })
})


export const { 
    useSignUpMutation, 
    useLoginMutation, 
    useGetAllGamesQuery, 
    useGetGameByIdQuery, 
    useGetFreeGamesQuery, 
    useGetDiscountGamesQuery, 
    useGetHighRatedGamesQuery,
    useGetNewGamesQuery,
    useGetTwoHighRatedGamesQuery,
    useGetThreeNewGamesQuery,
    useGetSixHighRatedGamesQuery,
    useLazySearchGamesQuery
} = apiSlice