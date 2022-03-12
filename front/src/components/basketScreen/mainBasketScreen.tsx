import { useDispatch, useSelector} from "react-redux";
import { RootState} from "../../store/store";
import { useEffect } from "react";
import { toggleShwoModal } from "../../store/slicers/tokenSlicer";
import { basketItemsAPI } from "../../store/APIs/basketItemsAPI";
import BasketItem from "./basketItem";
import {Container, Table, TableBody, Typography} from "@mui/material"

function MainBasketScreen() {
	const {token: login, showModal}= useSelector((state: RootState)=> state.tokenReducer);
	const dispatch = useDispatch();
	const {data: basketItemsData, isError} = basketItemsAPI.useFetchAllBasketItemsQuery(login as string);
	const totalPrice = basketItemsData?.reduce(( result, item) => result + (item.price * item.cnt), 0);

	useEffect(() => {
		if (!login && showModal !== true){
			dispatch(toggleShwoModal());
		}
	}, [login]);

	return (
		<>
		<Container sx={{
			mt: "5vh",
			}}
			>
				{ basketItemsData && basketItemsData.length !== 0 && !isError &&
				<>
					<Table>
						<TableBody>
							{basketItemsData.map(item => {return ( <BasketItem 
								key={item.id} data={item} token={login} />	)
							})
							}			
						</TableBody>
					</Table>
						<Typography style={{textAlign:"right"}} variant="h4">Итого: {totalPrice}</Typography>
				</>
				}
				{basketItemsData && basketItemsData.length === 0 && <Typography variant="h4" style={{textAlign:"center"}}> Ваша корзина пуста</Typography>}
				{!basketItemsData && isError && <Typography variant="h4" style={{textAlign:"center"}}> Воидите чтобы воспользоваться корзиной</Typography>}
		</Container>
		</>
	)
}

export default MainBasketScreen;