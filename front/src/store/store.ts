import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {itemsAPI} from "./APIs/itemsAPI"
import {basketItemsAPI} from "./APIs/basketItemsAPI" 
import {userAPI} from "./APIs/userAPI"
import tokenReducer from "./slicers/tokenSlicer";


const rootReducer = combineReducers({
	tokenReducer,
	[itemsAPI.reducerPath]: itemsAPI.reducer,
	[basketItemsAPI.reducerPath]:  basketItemsAPI.reducer,
	[userAPI.reducerPath]:  userAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
		.concat(itemsAPI.middleware, basketItemsAPI.middleware, userAPI.middleware)
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']