import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainShopScreen from "./components/shopScreen/main";
import NavMenu from './components/navMenu/navMenuMain';
import MainBasketScreen from "./components/basketScreen/mainBasketScreen";
import ItemScreen from './components/itemScreen/itemScreenMain';
import Error404 from './components/error404/error404';
import { Navigate } from "react-router-dom"


function App(){

	return (
		<div>
			<NavMenu />
			<Routes>
				<Route path={"/"} element={<Navigate to={"shop"} />} />
				<Route path={"/shop/:id"} element={<MainShopScreen/>} />
				<Route path={"/shop"} element={<Navigate to={"1"} />} />
				<Route path={"/basket"} element={<MainBasketScreen/>} />
				<Route path={"/item/:id"} element={<ItemScreen/>} />
				<Route path={"*"} element={<Error404/>} />
			</Routes>
		</div>
	);
}

export default App;
