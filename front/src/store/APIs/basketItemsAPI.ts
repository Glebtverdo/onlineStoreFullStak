import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { basketItemType } from "../../types";

export const basketItemsAPI = createApi({
    reducerPath: 'basketItemsAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACK_SERVER}),
    tagTypes: ['basketItems'],
    endpoints: (build) => ({
        fetchAllBasketItems: build.query<basketItemType[], string>({
            query: (token) => ({
                url: `/basketitem/getall`,
                headers: {
                    Authorization: token
                }
            }),
            providesTags: (result) =>
            result
              ? [
                  ...result.map(({ id }) => ({ type: 'basketItems' as const, id })),
                  { type: 'basketItems', id: 'LIST' },
                ]
              : [{ type: 'basketItems', id: 'LIST' }],
        }),
        fetchOneBasketItem: build.query<basketItemType, {token:string, id:number}>({
            query: ({token, id}) => ({
                url: `/basketitem/getone`,
                headers: {
                    Authorization: token
                },
                params: {id}
            }),
            providesTags: [{ type: 'basketItems', id: 'LIST' }]
        }),
        incrementBasketItem: build.mutation<any, {body:{basketItemId: number}, token: string}>({
            query: ({body, token}) => ({
                url: `/basketitem/incrementcnt`,
                method: "post",
                headers: {
                    Authorization: token
                },
                body: body
            }),
            invalidatesTags: [{ type: 'basketItems', id: 'LIST' }],
        }),
        decrementBasketItem: build.mutation<any, {body:{basketItemId: number}, token: string}>({
            query: ({body, token}) => ({
                url: `/basketitem/decrementcnt`,
                method: "post",
                headers: {
                    Authorization: token
                },
                body: body
            }),
            invalidatesTags: [{ type: 'basketItems', id: 'LIST' }],
        }),
        addBasketItem: build.mutation<any, {body:{itemId: number}, token: string}>({
            query: ({body, token}) => ({
                url: `/basketitem/newitem`,
                method: "post",
                headers: {
                    Authorization: token
                },
                body: body
            }),
            invalidatesTags: [{ type: 'basketItems', id: 'LIST' }],
        }),
        delBasketItem: build.mutation<any, {body:{itemId: number}, token: string}>({
            query: ({body, token}) => ({
                url: `/basketitem/deletone`,
                method: "post",
                headers: {
                    Authorization: token
                },
                body: body
            }),
            invalidatesTags: [{ type: 'basketItems', id: 'LIST' }],
        }),
        changeCntBasketItem: build.mutation<any, {body:{itemId: number, basketItemId: number,
                                                 delta: number}, token: string}>({
            query: ({body, token}) => ({
                url: `/basketitem/changecnt`,
                method: "post",
                headers: {
                    Authorization: token
                },
                body: body
            }),
            invalidatesTags: [{ type: 'basketItems', id: 'LIST' }],
        })
	})
})