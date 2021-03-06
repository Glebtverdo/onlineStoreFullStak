import { useParams } from "react-router";
import { itemsAPI } from "../../store/APIs/itemsAPI"
import { userAPI } from "../../store/APIs/userAPI";
import { Navigate } from "react-router-dom"
import { Container,  CircularProgress, Button, Box} from "@mui/material";
import { basketItemsAPI } from "../../store/APIs/basketItemsAPI";
import {useSelector, useDispatch} from "react-redux";
import { toggleShwoModal } from "../../store/slicers/tokenSlicer";
import { RootState} from "../../store/store";
import {useState} from "react"
import ButtonsIncDec from "../buttonsIncDec/buttonsIncDec";
import EditableInput from "./editableInput";
import MyAlert from "../alert/myAlert";
const serverAdress = process.env.REACT_APP_BACK_SERVER

function ItemScreen(){
	const id = parseInt(useParams().id ?? "-1");
	const {data: itemData, isError: isItemError, isLoading: isItemsLoading} = itemsAPI.useFetchOneItemQuery(id);
	const {token}= useSelector((state: RootState)=> state.tokenReducer);
	const dispatch = useDispatch();
	const [addNewItem, {isLoading: isBasketItemLoading}] = basketItemsAPI.useAddBasketItemMutation();
	const {data: basketItemData,  isError: isBasketItemError} = basketItemsAPI.useFetchOneBasketItemQuery({
		token: token as string, id
	});
	const [deleteItem] = itemsAPI.useDelItemMutation();
	const {data: userData, isError: isUserError} = userAPI.useCheckTokenQuery(token as string);
	const isAdmin = userData && !isUserError ? userData.role === "Admin"  ? true : false : false;
	const [showAlert, setShowAlert] = useState(false)
	const [errorMessadge, setErrorMessadge] = useState("");
	
	const popUpAlert = (error: string)=>{
		setErrorMessadge(error);
		setShowAlert(true);
	}

	const addBasketItem = async () => {
		if (!token)
		{
			dispatch(toggleShwoModal());
		}
		else if (itemData)
		{
			const resul = await addNewItem({body: {itemId: itemData.id}, token}) as any
			if(resul.hasOwnProperty("error"))
			{
				popUpAlert(resul.error.data.message)
			}
		}
	}

	const funcDelItem = async () => {
		if (token)
		{
			const item = await deleteItem({id, token}) as any;
			if (item.hasOwnProperty("error")){
				popUpAlert(item.error.data.message)
			}
		}
	}

	const itemDataForInputs = itemData ? [
		{
			text: itemData.name,
			lable: "name",
			style: {fontSize:{xs:"1.5em", sm:"2.5em", md: "3em"}, paddingTop:{xs: "8px", sm:0}},
			type: "string",
			prefix: ""
		},
		{
			text: `${itemData.price}`,
			lable: "price",
			style: {fontSize:{xs:"1.2em", sm: "2em"}, paddingTop:{xs: "12px", md:"5px"}},
			type: "number",
			prefix: "????????: "
		},
		{
			text: `${itemData.restCount}`,
			lable: "restCount",
			style: {fontSize:{xs:"1.2em", sm: "2em"}, paddingTop:{xs: "12px", md:"5px"}},
			type: "number",
			prefix: "??????????????: "
		},
	] : null

	const editableInputsRender = itemDataForInputs ? itemDataForInputs.map(el => {
		return isAdmin || el.lable !== "restCount" ? (<EditableInput
		key={el.lable} text={el.text} lable={el.lable} style={el.style}
		type={el.type} prefix={el.prefix} id={id}
		isAdmin={isAdmin}
		/>) : null 
	}) : null

	return(
		<>
			{isItemError && <Navigate replace={true} to={"/Error404"} />}
			{isItemsLoading && <CircularProgress size={100} style={{marginLeft:"calc(50% - 75px)"}}/>}
			{ itemData && <Container maxWidth="xl"
			 sx={{flexDirection:{xs: "column", sm: "row"}, display: "flex", flexWrap: "nowrap", marginTop: "5vh", justifyContent: "center"}}>
					<Box sx={{
						height: {xs:"50vh",sm:"80vh"},
						width: {xs: "100%",sm: "60%"},
						backgroundImage: "url('" + serverAdress + itemData.img + "')",
						backgroundRepeat: "no-repeat",
						backgroundSize: "100% 100%",
					}} >
					</Box>
					<Box style={{marginLeft:"5vw"}}>
						{editableInputsRender}
						{ isBasketItemError && 
						<Button variant="outlined" size="large"
						 sx={{color: "#7ca1da", borderColor: "#6385ba"}}
						 disabled={isBasketItemLoading || itemData.restCount === 0} onClick={addBasketItem} >
							{itemData.restCount > 0 && "??????a???????? ?? ??????????????"}
							{itemData.restCount === 0 && "?????? ?? ??????????????"}
						</Button>}
						
						{ basketItemData && !isBasketItemError && <ButtonsIncDec itemID={id}
						 basketItemCnt={basketItemData.cnt}  basketItemId={basketItemData.id}/>}
						<br/>
						{ userData && !isUserError && userData.role === "Admin" &&
						  <Button variant="contained" size="large"
							style={{marginTop: "3vh"}}
						 	color="error"
							 onClick={funcDelItem} >
							?????????????? ??????????
						</Button>}
					</Box>
					
			</Container>}
			<MyAlert errorMessadge={errorMessadge} showAlert={showAlert}
			 toggleShowAlert={()=>{setShowAlert(false)}} />
		</>
	)

}

export default ItemScreen;