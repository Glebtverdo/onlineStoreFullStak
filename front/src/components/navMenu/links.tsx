import {NavLink} from "react-router-dom";
import { MenuItem, Badge} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { basketItemsAPI } from "../../store/APIs/basketItemsAPI";
import { RootState} from "../../store/store";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
	navItem: {
		textDecoration: "none",
		fontSize: "1.2em",
	}
})

function Links(props: {color: string, close: () => void}) {

	const {token}= useSelector((state: RootState)=> state.tokenReducer);
	const {data: basketItemsData} = basketItemsAPI.useFetchAllBasketItemsQuery(token as string);
	const classes = useStyles();
	const {color, close}= props;
	
	return (
		<>
			<NavLink className={classes.navItem} to={"/shop/1"}> 
				<MenuItem sx={{color}} onClick={close}> Магазин </MenuItem>
			</NavLink>
			<NavLink className={classes.navItem} to={"/basket"}>
				<MenuItem sx={{color}} onClick={close}>
					<Badge badgeContent={token ? basketItemsData?.length : 0} color="error"> Корзина </Badge>
				</MenuItem>
			</NavLink>
		</>
	)
}

export default Links;