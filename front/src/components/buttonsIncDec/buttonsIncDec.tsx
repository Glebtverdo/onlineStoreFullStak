import { useSelector } from "react-redux";
import { basketItemsAPI } from "../../store/APIs/basketItemsAPI";
import { RootState } from "../../store/store";
import {Box, Input, IconButton} from '@mui/material'
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { itemsAPI } from "../../store/APIs/itemsAPI";
import { useEffect, useState } from "react";
import MyAlert from "../alert/myAlert";


const useStyles = makeStyles({
	butonsIncDec:{
		color: "#7ca1da",
		padding: 0,
		width: "30px"
	},
	inputForCounter:{
		color: "#7ca1da",
		width: "4vw",
		padding: 0,
		maxHeight: "5vh",
		borderLeft: "solid 1px #6385ba",
		borderRight: "solid 1px #6385ba",
	}
})


function ButtonsIncDec(props: {basketItemCnt: number, basketItemId: number | null, itemID: number}) {
	const classes = useStyles();
	const {basketItemCnt, basketItemId, itemID} = props;
	const [inputValue, setInputValue] = useState(basketItemCnt.toString());
	const {token} = useSelector((state : RootState) => state.tokenReducer)
	const [increment, {isLoading: isIncrementLoading}] = basketItemsAPI.useIncrementBasketItemMutation();
	const [decrement, {isLoading: isDecrementLoading}] = basketItemsAPI.useDecrementBasketItemMutation();
	const [changeCnt, {isLoading: isChangingCntLoading}] = basketItemsAPI.useChangeCntBasketItemMutation();
	const {data: itemData, refetch: itemDataRefetch}= itemsAPI.useFetchOneItemQuery(itemID)
	const [showAlert, setShowAlert] = useState(false)
	const [errorMessadge, setErrorMessadge] = useState("");

	useEffect(()=> {
		setInputValue(basketItemCnt.toString());
	}, [basketItemCnt])

	const checkInputValue = async () => {
		if (itemData && token && basketItemId)
		{
			let newVal = parseInt(inputValue);
			if (isNaN(newVal))
			{
				setInputValue(basketItemCnt.toString());
				return 0;
			}
			let delta = basketItemCnt - newVal;
			delta = itemData.restCount + delta < 0 ? -1 * itemData.restCount : delta

			switch (delta) {
				case -1:
					await buttonsHandler(increment);
					break;

				case 1:
					await buttonsHandler(decrement);
					break;
				default:
					try{
						await changeCnt({body: {basketItemId, itemId: itemID, delta},
							token});
						itemDataRefetch();
						break;
					}
					catch(e){
						setShowAlert(true);
						const error = e as any;
						setErrorMessadge(error.messadge);
						break;
					}
			}
			if(inputValue !== basketItemCnt.toString())
			{
				setInputValue(basketItemCnt.toString());
			}
		}
	}

	const buttonsHandler = async (callback: any) => {
		const result = await callback({body:{basketItemId: (basketItemId as number)}, token: token as string}) as any;
		itemDataRefetch();
		if (result.hasOwnProperty("error"))
		{
			setShowAlert(true);
			setErrorMessadge(result.error.data.message);
		}
	}

	return (
		<>
			<Box sx={{border: "solid 2px #6385ba", justifyContent: "space-evenly" ,  display: "flex", maxWidth:"60%", borderRadius: "4px"}}>
				<IconButton size="small" className={classes.butonsIncDec}
					onClick={async () => await buttonsHandler(decrement)}
					disabled={ isDecrementLoading || isChangingCntLoading || isIncrementLoading}
				>
					<HorizontalRuleIcon />
				</IconButton>
				<Input
				value={inputValue}
				sx={{textAlignLast: "center", minWidth:"40%"}}
				disabled={ isDecrementLoading || isChangingCntLoading || isIncrementLoading}
				disableUnderline={true} className={classes.inputForCounter}
				onChange={(e) => {
					let strToNum = parseInt(e.target.value);
					if((!isNaN(strToNum)))
					{
						setInputValue(strToNum.toString())
					} else if(e.target.value === "")
					{
						setInputValue("")
					}
				}	}
				onBlur={async () => await checkInputValue()}
				/>
				<IconButton size="small" className={classes.butonsIncDec}
					disabled={ isDecrementLoading || isChangingCntLoading || isIncrementLoading
						|| ((itemData?.restCount ?? 1 )=== 0)}
					onClick={async () => await buttonsHandler(increment)}
					><AddIcon /></IconButton>
			</Box>
			<MyAlert errorMessadge={errorMessadge} showAlert={showAlert}
			 toggleShowAlert={()=>{setShowAlert(false)}} />
		</>
	)
}
export default ButtonsIncDec