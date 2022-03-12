import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { itemType, bodyForGetAllItemsType, newItemType  } from "../../types";

export const itemsAPI = createApi({
    reducerPath: 'itemsAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACK_SERVER}),
    tagTypes: ['items'],
    endpoints: (build) => ({
        fetchAllItems: build.query<itemType[], bodyForGetAllItemsType>({
            query: (body) => ({
                url: `/item/getall`,
                params: body
            }),
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'items' as const, id })),
                    { type: 'items', id: 'LIST' },
                    ]
                : [{ type: 'items', id: 'LIST' }],
        }),
        fetchOneItem: build.query<itemType, number>({
            query: (id) => ({
                url: `/item/getone`,
                params: {id}
            }),
            providesTags: [{ type: 'items', id: 'LIST' }]
        }),
        fetchGetItemsCount: build.query<number, any>({
            query: () => ({
                url: `/item/getcount`
            }),
            providesTags: [{ type: 'items', id: 'LIST' }]
        }),
        makeNewItem: build.mutation<itemType, {data: FormData, token: string}>({
            query: ({data, token}) => ({ 
                url: `/item/newitem`,
                body: data,
                headers: {
                    Authorization: token
                },
                method: "post"
            }),
            invalidatesTags: [{ type: 'items', id: 'LIST' }]
        }),
        delItem: build.mutation<itemType, {id: number, token: string}>({
            query: ({id, token}) => ({ 
                url: `/item/delet`,
                body: {id},
                headers: {
                    Authorization: token
                },
                method: "post"
            }),
            invalidatesTags: [{ type: 'items', id: 'LIST' }]
        }),
        changeItem: build.mutation<itemType, {data: {},
             token: string}>({
            query: ({data, token}) => ({ 
                url: `/item/changeitemdata`,
                body: data,
                headers: {
                    Authorization: token
                },
                method: "post"
            }),
            invalidatesTags: [{ type: 'items', id: 'LIST' }]
        })
	})
})