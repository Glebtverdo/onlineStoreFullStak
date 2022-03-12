import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import { fullUserType, regUserType, logUserType } from "../../types";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACK_SERVER}),
    tagTypes: ['user'],
    endpoints: (build) => ({
        checkToken: build.query<fullUserType, string>({
            query: (token) => ({
                url: `/user/check`,
				headers: {
                    Authorization: token
                }
            })
        }),
        registerNewUser: build.mutation<{user:fullUserType, token: string}, regUserType>({
            query: (body: regUserType) => ({
                url: `/user/registraton`,
				body: body,
                method: "POST" 
            })
        }),
        logInUser: build.mutation<{user: fullUserType, token: string}, logUserType>({
            query: (body: logUserType) => ({
                url: `/user/login`,
                body: body,
                method: "POST" 
            })
        })
	})
})