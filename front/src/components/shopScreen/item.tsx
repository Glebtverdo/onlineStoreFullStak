import { itemComponentPropsType} from "../../types"
import ButtonsIncDec from "../buttonsIncDec/buttonsIncDec";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toggleShwoModal } from "../../store/slicers/tokenSlicer";
import { basketItemsAPI } from "../../store/APIs/basketItemsAPI";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions} from '@mui/material';
import { NavLink } from "react-router-dom";
const serverAdress = process.env.REACT_APP_BACK_SERVER


function Item(props: itemComponentPropsType) {
	const {token } = useSelector((state: RootState) => state.tokenReducer);
	const dispatch = useDispatch();
	const [addNewItem, {isLoading}] = basketItemsAPI.useAddBasketItemMutation();
	const {itemData, isInBasket, basketItemCnt, basketItemId} = props;

	const addBasketItem = async () => {
		if (!token)
		{
			dispatch(toggleShwoModal());
		}
		else
		{
			const resul = await addNewItem({body: {itemId: itemData.id}, token}) as any
			if(resul.hasOwnProperty("error"))
			{
				alert(resul.error.data.message)
			}
		}
	}

	const style = { width: "100%",
		height: "200px",
		display: "flex",
		backgroundImage: "url('" + serverAdress + itemData.img + "')",
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 100%",
		
	}

	return (
			<Card sx={{height: "100%"}} variant="outlined">
				<NavLink style={{textDecoration: "none", color: "#505a66"}} to={"/item/" + itemData.id}>
					<CardActionArea>
					<div style={style}>
					</div>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
						{itemData.name}
						</Typography>
						<Typography variant="body2">
						Price: {itemData.price}
						</Typography>
					</CardContent>
					</CardActionArea>
				</NavLink>
				<CardActions sx={{ justifyContent: "center" }}>
					{ !isInBasket && 
					<Button variant="outlined" size="large" sx={{color: "#7ca1da", borderColor: "#6385ba"}} disabled={isLoading || itemData.restCount === 0} onClick={addBasketItem} >
						{itemData.restCount > 0 && "Добaвить в корзину"}
						{itemData.restCount === 0 && "Нет в наличие"}
					</Button>}
					{ isInBasket && <ButtonsIncDec itemID={itemData.id} basketItemCnt={basketItemCnt}  basketItemId={ basketItemId}/>}
				</CardActions>
			</Card>
	)
}

export default Item;