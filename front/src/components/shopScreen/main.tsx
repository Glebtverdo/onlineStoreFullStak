import {itemsAPI} from '../../store/APIs/itemsAPI'
import { basketItemsAPI } from "../../store/APIs/basketItemsAPI";
import {useSelector} from "react-redux";
import { RootState} from "../../store/store";
import Item from './item'
import { userAPI } from '../../store/APIs/userAPI';
import { Container, Grid, Pagination, CircularProgress, PaginationItem} from '@mui/material';
import AddNewItemButton from './addNewItemButton';
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import {  NavLink, Navigate } from "react-router-dom"

function MainShopScreen() {
	const id = parseInt(useParams().id ?? "-1");
	const {data: itemsCount, isLoading: isItemsCountLoading} = itemsAPI.useFetchGetItemsCountQuery('');
	const width =  document.documentElement.scrollWidth;
	const [limit, setLimit] = useState(width <= 900 ? 4 : width <= 1200 ? 6 : 8);
	const pagesCount = itemsCount ? itemsCount % limit === 0 ? Math.floor(itemsCount/limit) : Math.floor(itemsCount/limit) + 1 : 1;
	const {token: login}= useSelector((state: RootState)=> state.tokenReducer);
	const [page, setPage] = useState(id)
	const {data: itemsData, isLoading, isError: isItemsError} = itemsAPI.useFetchAllItemsQuery({limit, page: page - 1});
	const {data: basketItemsData, isError: isBasketItemsError} = basketItemsAPI.useFetchAllBasketItemsQuery(login as string);
	const {data: userData, isError: isUSerError} = userAPI.useCheckTokenQuery(login as string);

	const widthChange = () =>{
		let width = document.documentElement.scrollWidth;
		let newLimit = width <= 900 ? 4 : width <= 1200 ? 6 : 8;
		if (limit !== newLimit){
			setLimit(newLimit)
		}
	}

	useEffect(() => {
		window.addEventListener("resize", widthChange);
	}, []);

	return(
		<>
			
			{!isItemsCountLoading && (page > pagesCount || page === -1 ||
			 isItemsError || itemsData?.length === 0) &&
			 <Navigate replace={true} to={"/Error404"} />}
			<Container sx={{
			mt: userData?.role !== "Admin" ? "5vh" : "2vh",
			}}
			maxWidth="xl"
			>
			{!isUSerError && userData?.role === "Admin" && <AddNewItemButton/>}
			{isLoading && <CircularProgress size={100} style={{marginLeft:"calc(50% - 75px)"}}/>}
			{itemsData &&
			<>
				<Grid container spacing={4}>
					{itemsData.map(el => { 
						let basketItem = basketItemsData?.find(item => { return item.ItemId === el.id}) ?? null;
						let isInBasket = basketItem !== null && !isBasketItemsError ? true : false
						return (
							<Grid key={el.id} item xs={12} sm={6} md={4} lg={3}>
								<Item  itemData={el} isInBasket={isInBasket} basketItemCnt={basketItem?.cnt ?? 0}  basketItemId={basketItem?.id ?? null}/>
							</Grid>)
						})
					}
				</Grid>
				<Pagination sx ={{display: "flex", justifyContent: "center", mt: "5vh"}}
					count={pagesCount} page={page}
					onChange = {(e, value) => setPage(value)} 
					color="primary"
					renderItem ={(item) => (
						<NavLink style={{textDecoration: "none"}} to={`/shop/${item.page}`}>
							<PaginationItem 
							{...item}
							/>
						</NavLink>
					)}
					/>
			</>
			}
		</Container>
	</>)
}

export default MainShopScreen;