import { basketItemType } from "../../types";
import {TableCell, TableRow, IconButton, Typography} from "@mui/material" 
import ButtonsIncDec from "../buttonsIncDec/buttonsIncDec";
import { basketItemsAPI } from "../../store/APIs/basketItemsAPI";
import { NavLink } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
const serverAdress = process.env.REACT_APP_BACK_SERVER

function BasketItem(props: {data: basketItemType, token: string | null}) {
	const { data:{id, cnt, name, img, price, ItemId}, token}= props;
	const [delBasketItem] = basketItemsAPI.useDelBasketItemMutation();

	const delet = async () => {
		if(token){ 
			const resul = await delBasketItem({body: {itemId: ItemId}, token}) as any
			if(resul.hasOwnProperty("error"))
			{
				alert(resul.error.data.message)
			}
		}
	}

	const style = { width: "200px",
		height: "200px",
		display: "flex",
		backgroundImage: "url('" + serverAdress + img + "')",
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 100%"
	}

	return (
		
			<TableRow>
				<TableCell  sx={{ display:{xs: "none", md:"block"}, maxWidth: "300px"}}>
					<NavLink to={"/item/" + ItemId}>
						<div style={style}></div>
					</NavLink>
				</TableCell>
				<TableCell> <Typography variant="h4" sx={{fontSize:{xs:"1.5em", md: "3em"}}}> {name} </Typography> </TableCell>
				<TableCell sx={{ width:{xs: "none", md:"90px", lg:"150px"}}}></TableCell>
				<TableCell> <Typography variant="h5" sx={{fontSize:{xs:"1em", md: "2.5em"}}}> {price} </Typography> </TableCell>
				<TableCell><ButtonsIncDec itemID={ItemId} basketItemCnt={cnt}  basketItemId={id}/></TableCell>
				<TableCell> <IconButton onClick={delet}> <CloseIcon></CloseIcon> </IconButton> </TableCell>
			</TableRow>

	)
}
export default BasketItem;